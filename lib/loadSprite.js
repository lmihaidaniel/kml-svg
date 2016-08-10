export default (function() {
    let exists = function(id){
        if (typeof id === 'string' && document.querySelector('#' + id) !== null) {
            return true;
        }
    }
    // Load a sprite
    function loadSprite(url, id, cb) {
        // If the id is set and sprite exists, bail
        if(exists(id)) return;

        var x = new XMLHttpRequest();

        x.open('GET', url, true);

        // Inject hidden div with sprite on load
        x.onload = function() {
            if(exists(id)) return;
            var c = document.createElement('div');
            c.setAttribute('hidden', '');
            c.setAttribute('style', 'display: none;');
            if (typeof id === 'string') {
                c.setAttribute('id', id);
            }
            c.innerHTML = x.responseText;
            document.body.insertBefore(c, document.body.childNodes[0]);
            if(typeof cb === 'function') cb(c);
        }

        x.onerror = function(){
            alert('error');
        }

        x.send();
    }

  return loadSprite;
})();