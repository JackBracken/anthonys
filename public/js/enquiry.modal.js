
// /*
//  * In-Field Label jQuery Plugin
//  * http://fuelyourcoding.com/scripts/infield.html
//  *
//  * Copyright (c) 2009 Doug Neiner
//  * Dual licensed under the MIT and GPL licenses.
//  * Uses the same license as jQuery, see:
//  * http://docs.jquery.com/License
//  *
//  * @version 0.1
//  */
// (function($){
    
//     $.InFieldLabels = function(label,field, options){
//         // To avoid scope issues, use 'base' instead of 'this'
//         // to reference this class from internal events and functions.
//         var base = this;
        
//         // Access to jQuery and DOM versions of each element
//         base.$label = $(label);
//         base.label = label;

//         base.$field = $(field);
//         base.field = field;
        
//         base.$label.data("InFieldLabels", base);
//         base.showing = true;
        
//         base.init = function(){
//             // Merge supplied options with default options
//             base.options = $.extend({},$.InFieldLabels.defaultOptions, options);

//             // Check if the field is already filled in
//             if(base.$field.val() != ""){
//                 base.$label.hide();
//                 base.showing = false;
//             };
            
//             base.$field.focus(function(){
//                 base.fadeOnFocus();
//             }).blur(function(){
//                 base.checkForEmpty(true);
//             }).bind('keydown.infieldlabel',function(e){
//                 // Use of a namespace (.infieldlabel) allows us to
//                 // unbind just this method later
//                 base.hideOnChange(e);
//             }).change(function(e){
//                 base.checkForEmpty();
//             }).bind('onPropertyChange', function(){
//                 base.checkForEmpty();
//             });
//         };

//         // If the label is currently showing
//         // then fade it down to the amount
//         // specified in the settings
//         base.fadeOnFocus = function(){
//             if(base.showing){
//                 base.setOpacity(base.options.fadeOpacity);
//             };
//         };
        
//         base.setOpacity = function(opacity){
//             base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration);
//             base.showing = (opacity > 0.0);
//         };
        
//         // Checks for empty as a fail safe
//         // set blur to true when passing from
//         // the blur event
//         base.checkForEmpty = function(blur){
//             if(base.$field.val() == ""){
//                 base.prepForShow();
//                 base.setOpacity( blur ? 1.0 : base.options.fadeOpacity );
//             } else {
//                 base.setOpacity(0.0);
//             };
//         };
        
//         base.prepForShow = function(e){
//             if(!base.showing) {
//                 // Prepare for a animate in...
//                 base.$label.css({opacity: 0.0}).show();
                
//                 // Reattach the keydown event
//                 base.$field.bind('keydown.infieldlabel',function(e){
//                     base.hideOnChange(e);
//                 });
//             };
//         };

//         base.hideOnChange = function(e){
//             if(
//                 (e.keyCode == 16) || // Skip Shift
//                 (e.keyCode == 9) // Skip Tab
//               ) return; 
            
//             if(base.showing){
//                 base.$label.hide();
//                 base.showing = false;
//             };
            
//             // Remove keydown event to save on CPU processing
//             base.$field.unbind('keydown.infieldlabel');
//         };
      
//         // Run the initialization method
//         base.init();
//     };
    
//     $.InFieldLabels.defaultOptions = {
//         fadeOpacity: 0.5, // Once a field has focus, how transparent should the label be
//         fadeDuration: 300 // How long should it take to animate from 1.0 opacity to the fadeOpacity
//     };
    

//     $.fn.inFieldLabels = function(options){
//         return this.each(function(){
//             // Find input or textarea based on for= attribute
//             // The for attribute on the label must contain the ID
//             // of the input or textarea element
//             var for_attr = $(this).attr('for');
//             if( !for_attr ) return; // Nothing to attach, since the for field wasn't used
            
            
//             // Find the referenced input or textarea element
//             var $field = $(
//                 "input#" + for_attr + "[type='text']," + 
//                 "input#" + for_attr + "[type='password']," + 
//                 "textarea#" + for_attr
//                 );
                
//             if( $field.length == 0) return; // Again, nothing to attach
            
//             // Only create object for input[text], input[password], or textarea
//             (new $.InFieldLabels(this, $field[0], options));
//         });
//     };
    
// })(jQuery);



var modal = (function () {
    var
    method = {},
        $overlay,
        $modal,
        $content,
        $close;

    // Center the modal in the viewport
    method.center = function () {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function (settings) {
        $content.empty().append(settings.content);

        $modal.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });

        method.center();
        $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
    };

    // Close the modal
    method.close = function () {
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#">close</a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function () {
        $('body').append($overlay, $modal);
    });

    $close.click(function (e) {
        e.preventDefault();
        method.close();
    });

    return method;
}());

// Wait until the DOM has loaded before querying the document
$(document).ready(function () {
    $('a#make-enquiry').click(function (e) {
        modal.open({
            width: 500,
            content: '<p>Please fill in the following fields.</p> \
            <form action="/success" method="get">\n \
                <fieldset>\n \
                    <p>\n \
                        <label for="name">Name</label>\n \
                        <input type="text" name="name" value="" id="name" class="" autocomplete="off" title="Name">\n \
                    </p>\n \
                    <p>\n \
                       <label for="email">Email</label>\n \
                       <input type="text" name="email" value="" id="email" class="" autocomplete="off" title="Email address">\n \
                    </p>\n \
                    <p>\n \
                        <label for="message">Message</label>\n \
                        <textarea class="" autocomplete="off" id="message" name="message"></textarea>\n \
                    </p>\n \
                </fieldset>\n \
                <p>\n \
                    <input class="" type="submit" value="Make enquiry" />\n \
                </p>\n \
            </form>\n'
        });
        e.preventDefault();
    });
    
    $.get('/success', function(e){
        modal.open({content: "Thanks for enquiring! We'll be in touch soon."});
        e.preventDefault();
    });
});