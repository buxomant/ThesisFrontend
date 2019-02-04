import * as ko from 'knockout';
import * as vis from 'vis';

ko.bindingHandlers.visNetwork = {
    init: (element, valueAccessor) => {
        const unwrappedValue = ko.unwrap(valueAccessor());
        const data = ko.unwrap(unwrappedValue.data);
        const options = ko.unwrap(unwrappedValue.options);

        if (options.templateId){
            const templateId = ko.unwrap(options.templateId);
            const templateHtml = document.getElementById(templateId).innerHTML;
            // Set the template to a custom template which lets knockout bind the items
            options.template = function(item){
                // Create a div wrapper element to easily create elements from the template HTML
                const element = document.createElement('div');
                element.innerHTML = templateHtml;
                // Let knockout apply bindings on the element with the template, using the item as data context
                ko.applyBindings(item, element);
                // Return the bound element to vis.js, for adding in the component
                return element;
            };
        }

        // Apply the vis.js timeline component
        const network = new vis.Network(element, data, options);

        network.on("stabilizationIterationsDone", function () {
            network.setOptions( { physics: false } );
        });

        // Let knockout know that we want to handle bindings for child items manually
        return { controlsDescendantBindings: true };
    }
};

