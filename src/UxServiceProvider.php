<?php

namespace Lawepham\Ux;

use Illuminate\Support\ServiceProvider;

class UxServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        // Register TwigBridge\ServiceProvider
        $this->app->register(\TwigBridge\ServiceProvider::class);
        
        // Register routes
        if (! $this->app->routesAreCached()) {
            require __DIR__.'/routes.php';
        }
        
        //// Assets
        //$this->publishes([
        //    __DIR__.'/assets' => public_path('ux/assets'),
        //], 'public');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        // twig config
        $this->mergeConfigFrom(
            __DIR__.'/twigbridge.php', 'twigbridge'
        );
        
        // Load views
        $this->loadViewsFrom(__DIR__.'/helpers', 'helper');
        $this->loadViewsFrom(__DIR__.'/layouts', 'layout');
    }
}
