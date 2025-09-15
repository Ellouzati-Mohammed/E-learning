<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;


class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        //
    }

    /**
     * Custom render method for API JSON responses.
     */
    public function render($request, Throwable $exception)
    {

        if ($exception instanceof HttpException) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = 500;  // Valeur par défaut si l'exception n'est pas HTTP
        }

        return response()->json([
            'error' => true,
            'message' => $exception->getMessage() ?: class_basename($exception),
        ], $statusCode);
    }
}
