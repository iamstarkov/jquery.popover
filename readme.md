## Methods: ##

Use it like: `$('.smth').popover('show');`
   
### Available methods: ###

    destroy
    refresh
    option
    reposition
    toggle
    show
    hide

## Options ##

Change default options:
    
    $.fn.popover.options = {
        autoOpen: true
    };

Change options per selectors group:

    $('.smth').popover({
        effect: 'bounce'
    });

Change options per custom dom elements:
    
    <a
        href="http://example.com"
        data-popover='{
            "margin": 5,
            "speed": 600
        }'>
        Example link
    </a>


### Default options: ###

    autoOpen: false,
    notify: false, // if true will be hided after `delay` microseconds 
    delay: 4000, 
    effect: 'fade', // effects for using in show, hide, toggle methods
    speed: 'fast', 
    margin: 4, // margin from target element
    content: null,
    types: ['important', 'warning', 'error', 'success'],
    position: 'bottom',
    positions: ['top', 'right', 'bottom', 'left'],

## Callbacks ##

Use it like options for modifying existing plugin logic or add your one.

## Available callbacks ##

    beforeCreate: null,
    afterCreate: null,
    beforeToggle: null,
    afterToggle: null,
    beforeShow: null,
    afterShow: null,
    beforeHide: null,
    afterHide: null,
    beforeReposition: null,
    afterReposition: null,
    beforeRefresh: null,
    afterRefresh: null