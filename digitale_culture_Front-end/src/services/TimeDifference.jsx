
export default function TimeDifference(dateString) {
  
    const givenDate = new Date(dateString); // Convertit la date donnée
    const now = new Date(); // Date actuelle
    const diffInMs = givenDate - now; // Différence en millisecondes
    const diffInSeconds = Math.floor(diffInMs / 1000); // En secondes
  
    const timeUnits = [
      { unit: "year", value: 60 * 60 * 24 * 365 },
      { unit: "month", value: 60 * 60 * 24 * 30 },
      { unit: "week", value: 60 * 60 * 24 * 7 },
      { unit: "day", value: 60 * 60 * 24 },
      { unit: "hour", value: 60 * 60 },
      { unit: "minute", value: 60 },
      { unit: "second", value: 1 },
    ];
  
    for (const { unit, value } of timeUnits) {
      const diff = Math.floor(diffInSeconds / value);
      if (Math.abs(diff) >= 1) {

        if (Math.abs(diff) === 1) {
          return diff > 0 
            ? `in one ${unit}` 
            : `one ${unit}`;
        }
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(diff, unit);
      }
    }
  
    return "just now";
  }
  