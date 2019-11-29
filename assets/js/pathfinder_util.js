String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

var mod_table = [
    -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17
]
var ability_list = [
    "acrobazia",
    "addestrare_animali",
    "artista_della_fuga",
    "camuffare",
    "cavalcare",
    "conoscenze_arcane",
    "conoscenze_dungeon",
    "conoscenze_geografia",
    "conoscenze_ingegneria",
    "conoscenze_locali",
    "conoscenze_natura",
    "conoscenze_nobilta",
    "conoscenze_piani",
    "conoscenze_religioni",
    "conoscenze_storia",
    "diplomazia",
    "disattivare_congegni",
    "furtivita",
    "guarire",
    "intimidire",
    "intuizione",
    "intrattenere",
    "linguistica",
    "nuotare",
    "percezione",
    "raggirare",
    "rapidita_di_mano",
    "sapienza_magica",
    "scalare",
    "sopravvivenza",
    "utilizzare_congegni_magici",
    "valutare",
    "volare"
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

function getMaxRanks() {
    return (class_data.ranks_livello + (character_data.stats.int > 10 ? getModifier(character_data.stats.int) : 0) + (race_data.nome == "umano" ? 1 : 0)) * character_data.livello;
}

function getAvailableRanks() {
    let subtract = 0;
    let elements = $('.ability_rank').toArray();

    elements.forEach(element => {
        subtract += parseInt(element.value || 0);
    });

    return getMaxRanks() - subtract;
}

function getBAB(level) {
    return class_data.stat_table[level - 1].bab;
}

function getTS(level) {
    return {
        riflessi: class_data.stat_table[level - 1].riflessi,
        tempra: class_data.stat_table[level - 1].tempra,
        volonta: class_data.stat_table[level - 1].volonta
    }
}

function getModifier(number) {
    return mod_table[number - 1];
}

function SaveChanges(args) {

    character_data.oldname = character_data.nome;

    $.ajax({
        url: 'updateCharacter.onioncall',
        type: 'POST',
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(character_data),
        success: function (response) {
            console.log(response);
            if (args == undefined || args == null) {
                alert("Salvato");
            }
        },
        error: function () {
            alert("Ops.. qualcosa e' andato storto");
        }
    });

}

function TestService(url,data){
    $.ajax({
        url: url,
        type: 'POST',
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response);
            return response;
        },
        error: function () {
            alert("Ops.. qualcosa e' andato storto");
        }
    });
}