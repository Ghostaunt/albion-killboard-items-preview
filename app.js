/* 
FR-FR -> French
DE-DE -> Dutch
RU-RU -> Russian
PL-PL -> Polish
PT-BR -> Portuguese
ES-ES -> Spanish
*/

// HERE REPLACE CHOSEN LANGAGE
var lang = 'FR-FR';


$('body').append('<style>.item_infobox:hover {display: block;} .item_infobox { position: absolute; display: none; background: #ffffffb8; z-index: 10; font-size: 15px; max-width: 300px; padding: 20px; }</style>');
 
$('.item-list .item').each(function(i, e){
 
    var item_id = $(e).find('img').attr('title');
    var item_top = $(e).offset().top;
    var item_left = $(e).offset().left;
   
    $(e).data('item_id', i);
   
    $.ajax({
        dataType: 'json',
        url: 'https://gameinfo.albiononline.com/api/gameinfo/items/' + item_id + '/data',
        success : function(data){
            let description = data.localizedDescriptions ? data.localizedDescriptions[lang] : '';
            let active_spells = '';
            let passive_spells = '';
 
            if(data.activeSlots) {
                $.each(data.activeSlots, function(i, e){
                    $.each(e, function(i, e){
                        active_spells += '<b>' + e.localizedNames[lang] + '</b>' + e.localizedDescriptions[lang] + '<br /><br />';
                    });
                });
            }
 
            if(data.passiveSlots) {
                $.each(data.passiveSlots, function(i, e){
                    $.each(e, function(i, e){
                        passive_spells += '<b>' + e.localizedNames[lang] + '</b>' + e.localizedDescriptions[lang] + '<br /><br />';
                    });
                });
            }
 
            $('body').append('<div class="item_infobox iteminfobox_' + i + '" style="top: ' + (item_top + 50) + 'px; left: ' + (item_left + 50) + 'px"><h4>' + data.localizedNames[lang] + '</h4><p>' + description +'</p><p><b>Sorts actifs</b><br />' + active_spells  + '</p><p><b>Sorts passifs</b><br />' + passive_spells  + '</p></div>');
        }
    });
});
 
$('body').on('mouseenter', '.item-list .item', function() {
    $('.iteminfobox_' + $(this).data('item_id')).show();
});
 
 
$('body').on('mouseout', '.item-list .item', function() {
    $('.iteminfobox_' + $(this).data('item_id')).hide();
});
