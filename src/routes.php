<?php

// UX routes
Route::get('/assets/{name?}', [ function ($name) {
    $path = __DIR__ . "/assets/$name";
    $mime_type = \Lawepham\Ux\File::getFileType($path);
    if (\File::exists($path)) {
        return response()->file($path, array('Content-Type' => $mime_type));
    }
}])->where('name', '.+');
