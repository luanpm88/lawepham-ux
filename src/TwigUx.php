<?php

/**
 * This file is part of the TwigBridge package.
 *
 * @copyright Robert Crowe <hello@vivalacrowe.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Lawepham\Ux;

use Twig_Extension;
use Twig_SimpleFunction;
use App\Extensions\DateTime;

/**
 * Access Laravels url class in your Twig templates.
 */
class TwigUx extends Twig_Extension
{
    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'App_Extensions_Twig_Ux';
    }

    /**
     * {@inheritDoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('instantOf', array($this, 'instantOf')),
        ];
    }
    
    public function instantOf($class)
    {
        return new $class();
    }
}
