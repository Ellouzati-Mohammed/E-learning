import requests
import os
from typing import Text, Dict, Any, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from dotenv import load_dotenv

load_dotenv()
class ActionFetchDomains(Action):
    def name(self) -> Text:
        return "action_fetch_domains"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        token = None
        for event in reversed(tracker.events):
            if event.get("event") == "user" and event.get("metadata"):
                token = event["metadata"].get("token")
                break

        if not token:
            dispatcher.utter_message(text="❌ Token non trouvé dans les métadonnées.")
            return []

        headers = {"Authorization": f"Bearer {token}"}
        
        try:
            response = requests.get("http://127.0.0.1:8000/api/domains/", headers=headers)
            response.raise_for_status()
            domains = response.json()
            
            corrected_domains = []
            for d in domains:
                title = d["domain_title"]\
                    .replace("Écnomie", "Économie")\
                    .replace("nmérique", "numérique")
                corrected_domains.append({**d, "domain_title": title})
            
            message = "📚 Domaines disponibles :\n\n" + "\n".join(
                [f"- {d['domain_title']} (ID: {d['id']})" for d in corrected_domains]
            ) 
            
            dispatcher.utter_message(text=message)
            
        except Exception as e:
            dispatcher.utter_message(text="❌ Erreur lors du chargement des domaines")
            print(f"API Error: {str(e)}")
        
        return []
class ActionShowDomainDetails(Action):
    def name(self) -> Text:
        return "action_show_domain_details"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        try:
            # Extraire le token depuis les événements du tracker
            token = None
            for event in reversed(tracker.events):
                if event.get("event") == "user" and event.get("metadata"):
                    token = event["metadata"].get("token")
                    break

            # Vérifier la présence du token
            if not token:
                dispatcher.utter_message(text="❌ Token non trouvé dans les métadonnées.")
                return []

            # Extraire l'ID du domaine depuis le slot
            domain_id = tracker.get_slot("domain_id")
            if not domain_id or not domain_id.isdigit():
                dispatcher.utter_message(text="❌ ID invalide - Utilisez un nombre")
                return []

            # Définir les en-têtes avec le token
            headers = {"Authorization": f"Bearer {token}"}

            # Effectuer l'appel API
            response = requests.get(f"http://127.0.0.1:8000/api/domains/{domain_id}", headers=headers)
            response.raise_for_status()
            domain_data = response.json()

            # Construire le message de réponse
            url = f"http://localhost:3000/DomainsCours/{domain_id}"
            response_text = (
                f"🌐 *Domaine {domain_id}* : {domain_data['domain_title']}\n"
                f"🔗 Lien d'accès : [Cliquez ici]({url})"
            )
            dispatcher.utter_message(text=response_text)

        except requests.exceptions.HTTPError as err:
            if response.status_code == 404:
                dispatcher.utter_message(text=f"❌ Domaine {domain_id} introuvable")
            else:
                dispatcher.utter_message(text=f"⚠️ Erreur serveur (code {response.status_code})")
        except requests.exceptions.RequestException:
            print(f"Erreur de connexion détaillée: {str(e)}") 
            dispatcher.utter_message(text="⚠️ Serveur indisponible - réessayez plus tard")

        return []

class ActionGetDomainCourses(Action):

    def name(self) -> Text:
        return "action_get_domain_courses"

    def run(self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # 1. Extraire le token depuis les métadonnées du dernier message user
        token = None
        for event in reversed(tracker.events):
            if event.get("event") == "user" and event.get("metadata"):
                token = event["metadata"].get("token")
                break

        if not token:
            dispatcher.utter_message(text="❌ Token non trouvé dans les métadonnées.")
            return []

        # 2. Extraire l'ID du domaine depuis l'entité
        domain_id = next(tracker.get_latest_entity_values("domain_id"), None)
        if not domain_id:
            dispatcher.utter_message(text="Je n'ai pas compris le domaine. Pouvez-vous préciser ?")
            return []

        # 3. Appeler l'API avec le token
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = requests.get(
                f"http://127.0.0.1:8000/api/courses/{domain_id}/domain",
                headers=headers,
                timeout=5
            )
            response.raise_for_status()
            data = response.json()

            courses = data.get("courses", [])
            if not courses:
                dispatcher.utter_message(text=f"Aucun cours trouvé pour le domaine {domain_id}.")
                return []

            courses_list = "\n".join(
                [f"- {c['cours_title']} (ID: {c['id']})" for c in courses]
            )
            dispatcher.utter_message(
                text=f"📚 Les cours du domaine {domain_id} sont :\n{courses_list}"
            )

        except requests.exceptions.HTTPError as err:
            if response.status_code == 404:
                dispatcher.utter_message(text=f"❌ Domaine {domain_id} introuvable")
            else:
                dispatcher.utter_message(
                    text=f"⚠️ Erreur serveur (code {response.status_code})"
                )
        except requests.exceptions.RequestException as e:
            print(f"[ActionGetDomainCourses] Erreur API : {e}")
            dispatcher.utter_message(
                text="⚠️ Impossible de contacter le serveur de cours — réessayez plus tard"
            )

        return []
class ActionShowCourseDetails(Action):
    def name(self) -> Text:
        return "action_show_course_details"

    def run(self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # 1️⃣ Récupérer le token depuis les métadonnées
        token = None
        for event in reversed(tracker.events):
            if event.get("event") == "user" and event.get("metadata"):
                token = event["metadata"].get("token")
                break

        if not token:
            dispatcher.utter_message(text="❌ Token non trouvé dans les métadonnées.")
            return []

        # 2️⃣ Extraire l'ID du cours
        message = tracker.latest_message.get("text", "")
        course_id = "".join(filter(str.isdigit, message))
        if not course_id or len(course_id) > 4:
            dispatcher.utter_message(
                text="🔍 Veuillez spécifier un ID numérique valide (ex: '46' ou 'cours 46')"
            )
            return []

        # 3️⃣ Construire l'URL de l'API backend
        api_url = f"http://127.0.0.1:8000/api/activities/{course_id}/course"
        headers = {"Authorization": f"Bearer {token}"}

        try:
            response = requests.get(api_url, headers=headers, timeout=5)
            response.raise_for_status()
            course_data = response.json()
            activities = course_data.get("activities", {})

            # 4️⃣ Compter les types d’activités
            pdf_count   = len(activities.get("pdfs", []))
            video_count = len(activities.get("videos", []))
            quiz_count  = len(activities.get("quizzes", []))

            # 5️⃣ Envoyer la réponse à l’utilisateur
            message_lines = [
                f"📘 Cours {course_id} : {course_data.get('cours_title', 'Nom inconnu')}",
                "📊 Statistiques des activités :",
                f"• PDFs : {pdf_count} document(s)",
                f"• Vidéos : {video_count} tutoriel(s)",
                f"• Quiz : {quiz_count} évaluation(s)",
                f"🔗 Accès direct : [Cliquez ici]({api_url})"
            ]
            dispatcher.utter_message(text="\n".join(message_lines))

        except requests.exceptions.HTTPError:
            status = response.status_code
            if status == 404:
                dispatcher.utter_message(text=f"❌ Cours {course_id} introuvable")
            else:
                dispatcher.utter_message(
                    text=f"⚠️ Erreur serveur (code {status})"
                )
        except requests.exceptions.RequestException as e:
            print(f"[ActionShowCourseDetails] Erreur API : {e}")
            dispatcher.utter_message(
                text="⚠️ Impossible de contacter le serveur de cours — réessayez plus tard"
            )

        return []
