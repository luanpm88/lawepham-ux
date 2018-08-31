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
            new Twig_SimpleFunction(
                'ux',
                function ($path) {
                    return 'ux/templates/' . $path;
                }
            ),
            new Twig_SimpleFunction(
                'format_date_time',
                function ($datetime) {
                    return DateTime::formatDateTime($datetime);
                }
            ),
            new Twig_SimpleFunction(
                'format_date',
                function ($datetime) {
                    return DateTime::formatDate($datetime);
                }
            ),
            new Twig_SimpleFunction(
                'format_time',
                function ($datetime) {
                    return DateTime::formatTime($datetime);
                }
            ),
            new Twig_SimpleFunction(
                'auth_customer',
                function () {
                    if (\Auth::check() && \Auth::user()->customer) {
                        return \Auth::user()->customer;
                    } else {
                        return null;
                    }
                }
            ),
        ];
    }
}
