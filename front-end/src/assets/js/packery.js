export function initPackery() {
    console.log("grid init!");
    var pckry = new Packery('.grid', {
        itemSelector: '.grid-item',
        columnWidth: 100
    });

    pckry.getItemElements().forEach(function(itemElem) {
        var draggie = new Draggabilly(itemElem);
        pckry.bindDraggabillyEvents(draggie);
    });

}