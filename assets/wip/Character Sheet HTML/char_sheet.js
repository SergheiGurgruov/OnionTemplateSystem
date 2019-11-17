var character_data = { "_id": "5dcbcde8e9e72277f9131a1a", "giocatore": "Dares", "nome": "Areside", "razza": "umano", "classe": "iracondo di stirpe", "livello": 3, "stats": { "for": 10, "des": 12, "cos": 8, "int": 18, "sag": 14, "car": 12 }, "tot_ranks": "not set yet", "ability_ranks": { "acrobazia": 0, "addestrare_animali": 0, "artista_della_fuga": 0, "camuffare": 0, "cavalcare": 0, "conoscenze(arcane)": 0, "conoscenze(dungeon)": 0, "conoscenze(geografia)": 0, "conoscenze(ingegneria)": 0, "conoscenze(locali)": 0, "conoscenze(natura)": 0, "conoscenze(nobilta)": 0, "conoscenze(piani)": 0, "conoscenze(religioni)": 0, "conoscenze(storia)": 0, "diplomazia": 0, "disattivare_congegni": 0, "furtivita": 0, "guarire": 0, "intimidire": 0, "intuizione": 0, "intrattenere": 0, "linguistica": 0, "nuotare": 0, "percezione": 0, "raggirare": 0, "rapidita_di_mano": 0, "sapienza_magica": 0, "scalare": 0, "sopravvivanza": 0, "utilizzare_congegni_magici": 0, "valutare": 0, "volare": 0 }, "armi": [{ "nome": "Pugnale", "tiro": { "dado": "1d20", "stat": "for" }, "danno": { "dado": "1d4", "stat": "for" }, "critico": "19/20 x2" }, { "nome": "Balestra", "tiro": { "dado": "1d20", "stat": "des" }, "danno": { "dado": "1d8", "stat": "nessuna" }, "critico": "19/20 x2" }], "armature": [{ "nome": "Armatura di Pelle", "classe_armatura": 4 }, { "nome": "Scudo piccolo", "classe_armatura": 1 }], "talenti": [], "magie": [{ "nome": "mani brucianti", "componenti": "verbale,somatica", "raggio": "4,5m", "area": "a forma di cono", "durata": "istantaneo", "danno": "1d4 * Livello (max 5d4)", "tiro": "TS Riflessi Dimezza: CD 10 + 1(lv Incantesimo) + Caratteristica Rilevante", "dettagli": "I materiali infiammabili prendono fuoco" }], "inventario": ["50 frecce", "spada corta"], "monete": { "oro": 50, "argento": 30, "rame": 25 } }
var class_data = { "_id": "5dcac6ba28b27b7240351a34", "nome": "iracondo di stirpe", "dato_vita": "d10", "ricchezza": "3d6 x 10 mo (media 105)", "ranks_livello": 4, "class_abilities": ["acrobazia", "addestrare_animali", "artigianato", "cavalcare", "conoscenze(arcane)", "intimidire", "nuotare", "percezione", "sapienza_magica", "scalare", "sopravvivenza"], "stat_table": [{ "bab": 1, "tempra": 2, "riflessi": 0, "volonta": 0 }, { "bab": 2, "tempra": 3, "riflessi": 0, "volonta": 0 }, { "bab": 3, "tempra": 3, "riflessi": 1, "volonta": 1 }, { "bab": 4, "tempra": 4, "riflessi": 1, "volonta": 1 }, { "bab": 5, "tempra": 4, "riflessi": 1, "volonta": 1 }, { "bab": 6, "tempra": 5, "riflessi": 2, "volonta": 2 }, { "bab": 7, "tempra": 5, "riflessi": 2, "volonta": 2 }, { "bab": 8, "tempra": 6, "riflessi": 2, "volonta": 2 }, { "bab": 9, "tempra": 6, "riflessi": 3, "volonta": 3 }, { "bab": 10, "tempra": 7, "riflessi": 3, "volonta": 3 }, { "bab": 11, "tempra": 7, "riflessi": 3, "volonta": 3 }, { "bab": 12, "tempra": 8, "riflessi": 4, "volonta": 4 }, { "bab": 13, "tempra": 8, "riflessi": 4, "volonta": 4 }, { "bab": 14, "tempra": 9, "riflessi": 4, "volonta": 4 }, { "bab": 5, "tempra": 9, "riflessi": 5, "volonta": 5 }, { "bab": 16, "tempra": 10, "riflessi": 5, "volonta": 5 }, { "bab": 17, "tempra": 10, "riflessi": 5, "volonta": 5 }, { "bab": 18, "tempra": 11, "riflessi": 6, "volonta": 6 }, { "bab": 19, "tempra": 11, "riflessi": 6, "volonta": 6 }, { "bab": 20, "tempra": 12, "riflessi": 6, "volonta": 6 }], "more_info": ["https://golarion.altervista.org/wiki/Iracondo_di_Stirpe", "https://golarion.altervista.org/wiki/Iracondo_di_Stirpe/Stirpi"] }
var race_data = { "_id": "5dcabeec28b27b7240351a2f", "nome": "umano", "taglia": "media", "velocità": "normale", "stat_bonus": { "choose": 2 }, "ability_bonus": {}, "linguaggi": ["comune"], "talenti": ["Talento Bonus al Primo Livello", "Esperto: +1 grado abilità ogni livello"] }

var mod_table = [
    -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17
]

var stat_list = [
    "for",
    "des",
    "cos",
    "int",
    "sag",
    "car"
]

var tiri_salvezza_list = [
    "tempra",
    "riflessi",
    "volonta"
]

function getBAB(level){
    return class_data.stat_table[level - 1].bab;
}

function getTS(level){
    return {
        riflessi:class_data.stat_table[level - 1].riflessi,
        tempra:class_data.stat_table[level - 1].tempra,
        volonta:class_data.stat_table[level - 1].volonta
    }
}

function getModifier(number) {
    return mod_table[number - 1];
}

function init() {
    //setup iniziale Condizionale

    if (race_data.stat_bonus.choose) {
        $('#stat_choose_msg').html(`*Puoi Aggiungere ${race_data.stat_bonus.choose} punti a scelta nei tuoi roll`);
    }

    toggleBlock('.start_hidden');

    //--------------


    //configurazione Listener

    stat_list.forEach(element => {

        $(`#s_${element}_roll`).change(function () {
            $(`.l_${element}_roll`).val(parseInt(this.value) + (race_data.stat_bonus[element] || 0)).trigger("change");
        });

        $(`#s_${element}_tot`).change(function () {
            $(`.l_${element}_tot`).val(getModifier(parseInt(this.value))).trigger("change");
        });

        $(`#s_${element}_mod`).change(function () {
            $(`.l_${element}_mod`).val(parseInt(this.value)).trigger("change");
        });

        $(`#s_${element}_roll`).val(character_data.stats[element]).trigger("change");

    });

    tiri_salvezza_list.forEach(element => {
        $(`#s_${element}_base`).change(function(){
            $(`.l_${element}`).trigger("change");
        });

        $(`#s_${element}_mod`).change(function(){
            $(`.l_${element}`).trigger("change");
        });

        $(`.l_${element}`).change(function(){
            this.value = parseInt($(`#s_${element}_mod`).val()) + parseInt($(`#s_${element}_base`).val());
        });

        $(`#s_${element}_base`).val(getTS(character_data.livello)[element]).trigger("change");
        
    });

    //Settaggio Parametri---
        




    //------



}

function toggleBlock(blockId) {
    let myBlock = $(blockId);
    if (myBlock.css("visibility") == "hidden") {
        myBlock.css("visibility", "inherit");
        myBlock.css("height", "auto");
    } else {
        myBlock.css("visibility", "hidden");
        myBlock.css("height", "0px", "!important");
    }
}