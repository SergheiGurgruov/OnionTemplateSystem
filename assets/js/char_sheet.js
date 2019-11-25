//var character_data = { "_id": "5dcbcde8e9e72277f9131a1a", "giocatore": "Dares", "nome": "Areside", "razza": "umano", "classe": "iracondo di stirpe", "livello": 3, "stats": { "for": 10, "des": 12, "cos": 8, "int": 18, "sag": 14, "car": 12 }, "ability_ranks": { "acrobazia": 2, "addestrare_animali": 3, "artista_della_fuga": 0, "camuffare": 1, "cavalcare": 2, "conoscenze_arcane": 0, "conoscenze_dungeon": 0, "conoscenze_geografia": 0, "conoscenze_ingegneria": 0, "conoscenze_locali": 0, "conoscenze_natura": 0, "conoscenze_nobilta": 0, "conoscenze_piani": 0, "conoscenze_religioni": 0, "conoscenze_storia": 0, "diplomazia": 0, "disattivare_congegni": 0, "furtivita": 0, "guarire": 0, "intimidire": 0, "intuizione": 0, "intrattenere": 0, "linguistica": 0, "nuotare": 0, "percezione": 0, "raggirare": 0, "rapidita_di_mano": 0, "sapienza_magica": 0, "scalare": 0, "sopravvivenza": 0, "utilizzare_congegni_magici": 0, "valutare": 0, "volare": 0 }, "armi": [{ "nome": "Pugnale", "tiro": { "dado": "1d20", "stat": "for" }, "danno": { "dado": "1d4", "stat": "for" }, "critico": "19/20 x2" }, { "nome": "Balestra", "tiro": { "dado": "1d20", "stat": "des" }, "danno": { "dado": "1d8", "stat": "" }, "critico": "20 x3" }], "armature": [{ "nome": "Armatura di Pelle", "classe_armatura": 4 }, { "nome": "Scudo piccolo", "classe_armatura": 1 }], "talenti": ["Talento di Prova 1", "Talento di prova 2"], "magie": [{ "nome": "mani brucianti", "componenti": "verbale,somatica", "raggio": "4,5m", "area": "a forma di cono", "durata": "istantaneo", "danno": "1d4 * Livello (max 5d4)", "tiro": "TS Riflessi Dimezza: CD 10 + 1(lv Incantesimo) + Caratteristica Rilevante", "dettagli": "I materiali infiammabili prendono fuoco" }], "inventario": ["50 frecce", "spada corta"], "monete": { "oro": 50, "argento": 30, "rame": 25 } }
//var class_data = { "_id": "5dcac6ba28b27b7240351a34", "nome": "iracondo di stirpe", "dato_vita": "d10", "ricchezza": "3d6 x 10 mo (media 105)", "ranks_livello": 4, "class_abilities": ["acrobazia", "addestrare_animali", "artigianato", "cavalcare", "conoscenze_arcane", "intimidire", "nuotare", "percezione", "sapienza_magica", "scalare", "sopravvivenza"], "stat_table": [{ "bab": 1, "tempra": 2, "riflessi": 0, "volonta": 0 }, { "bab": 2, "tempra": 3, "riflessi": 0, "volonta": 0 }, { "bab": 3, "tempra": 3, "riflessi": 1, "volonta": 1 }, { "bab": 4, "tempra": 4, "riflessi": 1, "volonta": 1 }, { "bab": 5, "tempra": 4, "riflessi": 1, "volonta": 1 }, { "bab": 6, "tempra": 5, "riflessi": 2, "volonta": 2 }, { "bab": 7, "tempra": 5, "riflessi": 2, "volonta": 2 }, { "bab": 8, "tempra": 6, "riflessi": 2, "volonta": 2 }, { "bab": 9, "tempra": 6, "riflessi": 3, "volonta": 3 }, { "bab": 10, "tempra": 7, "riflessi": 3, "volonta": 3 }, { "bab": 11, "tempra": 7, "riflessi": 3, "volonta": 3 }, { "bab": 12, "tempra": 8, "riflessi": 4, "volonta": 4 }, { "bab": 13, "tempra": 8, "riflessi": 4, "volonta": 4 }, { "bab": 14, "tempra": 9, "riflessi": 4, "volonta": 4 }, { "bab": 5, "tempra": 9, "riflessi": 5, "volonta": 5 }, { "bab": 16, "tempra": 10, "riflessi": 5, "volonta": 5 }, { "bab": 17, "tempra": 10, "riflessi": 5, "volonta": 5 }, { "bab": 18, "tempra": 11, "riflessi": 6, "volonta": 6 }, { "bab": 19, "tempra": 11, "riflessi": 6, "volonta": 6 }, { "bab": 20, "tempra": 12, "riflessi": 6, "volonta": 6 }], "more_info": ["https://golarion.altervista.org/wiki/Iracondo_di_Stirpe", "https://golarion.altervista.org/wiki/Iracondo_di_Stirpe/Stirpi"] }
//var race_data = { "_id": "5dcabeec28b27b7240351a2f", "nome": "umano", "taglia": "media", "velocità": "normale", "stat_bonus": { "choose": 2 }, "ability_bonus": {}, "linguaggi": ["comune"], "talenti": ["Talento Bonus al Primo Livello", "Esperto: +1 grado abilità ogni livello"] }

//TOREMOVE

function onCharForm() {

    let formdata = $(".input_charForm").toArray();
    let emptyFields = 0;
    formdata.forEach(element => {
        if (element.value == "") {
            emptyFields++;
        }
    });

    if (emptyFields == 0) {
        let nome = formdata[0].value;
        let razza = formdata[1].value;
        let classe = formdata[2].value;
        let livello = formdata[3].value;

        console.log({
            "nome": nome,
            "razza": razza,
            "classe": classe,
            "livello": livello
        });

        character_data.oldname = character_data.nome;

        character_data.nome = nome;
        character_data.classe = classe;
        character_data.razza = razza;
        character_data.livello = livello;

        $.ajax({
            url: 'updateCharacter.onioncall',
            dataType: 'json',
            type: 'post',
            processData: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(character_data),
            success: function (data, textStatus, jQxhr) {
                //alert(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                //alert("Ops.. qualcosa e' andato storto");
            }
        });

        //console.log(window.location.pathname);

        window.location.href = window.location.pathname + `?charname=${nome}`;
    }
}
function onWeaponForm() {

    let formdata = $(".input_weaponForm").toArray();
    let emptyFields = 0;
    [formdata[0], formdata[1], formdata[2]].forEach(element => {
        if (element.value == "") {
            emptyFields++;
        }
    });

    if (emptyFields == 0) {
        let nome = formdata[0].value;
        let danno = formdata[1].value;
        let critico = formdata[2].value;
        let tiro_stat = formdata[3].value;
        let danno_stat = formdata[4].value;

        character_data.armi.push({
            "nome": nome,
            "critico": critico,
            "tiro": {
                "dado": "1d20",
                "stat": (tiro_stat == "dex" ? "des" : (stat_list.includes(tiro_stat) ? tiro_stat : ""))
            },
            "danno": {
                "dado": danno,
                "stat": (danno_stat == "dex" ? "des" : (stat_list.includes(danno_stat) ? danno_stat : ""))
            }
        });

        formdata[0].value = "";
        formdata[1].value = 0;
        formdata[2].value = "";
        formdata[3].value = "for";
        formdata[4].value = "";

        loadWeapons();
        statListenerSetup();

        $("#weaponModal").css("display", "none");

        SaveChanges("noalert");

    }
}

function onArmorForm() {
    let formdata = $(".input_weaponForm").toArray();
    let emptyFields = 0;
    [formdata[0]].forEach(element => {
        if (element.value == "") {
            emptyFields++;
        }
    });

    if (emptyFields == 0) { 
        let nome = formdata[0];
        let ca = formdata[1];
        character_data.armature.push({
            "nome": nome,
            "classe_armatura": parseInt(ca)
        });

        formdata[0].value = "";
        formdata[1].value = 0;

        $("#armorModal").css("display", "none");

        loadArmor();

        SaveChanges("noalert");
    }
}

function loadTalentiBonus() {
    let i = 0;
    character_data.talenti.forEach(element => {
        $('#talenti_bonus').append(`
                <tr>
                    <th><input class="talento_bonus" id="talento_bonus_${i}" value="${element}" type="text"></th>
                </tr>
        `);
        i++;
    });

    $('#talenti_bonus').append(`
            <tr>
                <th><input class="talento_bonus" id="talento_bonus_${i}" placeholder="Inserire qui talenti aggiuntivi ..." type="text"></th>
            </tr>
    `);

    $('.talento_bonus').change(function () {
        let index = parseInt(this.id.substr(this.id.lastIndexOf('_') + 1));
        if (index >= character_data.talenti.length) {
            if (this.value != "") {
                character_data.talenti.push(this.value);
                $('#talenti_bonus').append(`
                        <tr>
                            <th><input class="talento_bonus" id="talento_bonus_${index + 1}" placeholder="Inserire qui talenti aggiuntivi ..." type="text"></th>
                        </tr>
                `);
                $(`#talento_bonus_${index + 1}`).change($._data($('.talento_bonus')[0]).events["change"][0].handler);
            }
        } else {
            if (this.value != "") {
                character_data.talenti[index] = this.value;
            } else {
                character_data.talenti.splice(index, 1);
                $('#talenti_bonus').html(`<tr>
                        <th style="border: none;"><h4>Bonus</h4></th>
                    </tr>
                `);
                loadTalentiBonus();
            }
        }
    });
}

function loadInventario() {
    let i = 0;
    $('#inventario').html("");
    character_data.inventario.forEach(element => {
        $('#inventario').append(`
                <tr>
                    <th><input class="inventario_item" id="inventario_item_${i}" value="${element}" type="text"></th>
                </tr>
        `);
        i++;
    });

    $('#inventario').append(`
            <tr>
                <th><input class="inventario_item" id="inventario_item_${i}" placeholder="Inserire qui Oggetti aggiuntivi ..." type="text"></th>
            </tr>
    `);

    $('.inventario_item').change(function () {
        let index = parseInt(this.id.substr(this.id.lastIndexOf('_') + 1));
        if (index >= character_data.inventario.length) {
            if (this.value != "") {
                character_data.inventario.push(this.value);
                $('#inventario').append(`
                        <tr>
                            <th><input class="inventario_item" id="inventario_item_${index + 1}" placeholder="Inserire qui Oggetti aggiuntivi ..." type="text"></th>
                        </tr>
                `);
                $(`#inventario_item_${index + 1}`).change($._data($('.inventario_item')[0]).events["change"][0].handler);
            }
        } else {
            if (this.value != "") {
                character_data.inventario[index] = this.value;
            } else {
                character_data.inventario.splice(index, 1);
                loadInventario();
            }
        }
    });
}

function refreshClasseArmatura() {
    $('#ca_tot').val(10 + parseInt($('#s_des_mod').val()) + parseInt($('#ca_armor_bonus').val()));
}

function loadArmor() {
    let i = 0;
    $('#c_armature').html("");
    character_data.armature.forEach(element => {
        $('#c_armature').append(
            `<div id="armor_${i}" class="col-md-6 armor">
                    <div class="block">
                        <div style="position: absolute;right: 30px;top: 30px; cursor: pointer;"><img id="armor_del_${i}" src="https://img.icons8.com/material-outlined/24/000000/delete-forever.png"></div>
                        <h3>${element.nome}</h3>
                        <table style="margin-bottom: 20px;">
                            <tr>
                                <th>Bonus Classe Armatura:</th>
                                <th><input class="armor_value" value="${element.classe_armatura}" type="number" disabled></th>
                            </tr>
                        </table>
                    </div>
                </div>
        `);

        $(`#armor_del_${i}`).click(function () {
            let index = parseInt(this.id.substr(this.id.lastIndexOf('_') + 1));
            character_data.armature.splice(index, 1);
            loadArmor();
        });
        i++;
    });

    $('#c_armature').append(`
            <div id="add_armor" class="col-md-6">
                <div class="block" style="height: 127px;cursor:pointer;">
                    <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><h1 style="color: rgb(180, 180, 180);">+ Add Armor</h1></div>
                </div>
            </div>
    `)

    $('#add_armor').click(function () {

        $("#armorModal").css("display", "block");

        /* let nome = prompt("Nome Armatura");
        let ca = prompt("CA Bonus");
        character_data.armature.push({
            "nome": nome,
            "classe_armatura": parseInt(ca)
        });
        loadArmor(); */
    });

    let ca_armor_bonus = 0;

    character_data.armature.forEach(element => {
        ca_armor_bonus += element.classe_armatura;
    });

    $('#ca_armor_bonus').val(ca_armor_bonus);

    refreshClasseArmatura();

}

function loadWeapons() {
    $('#c_armi').html("");
    let i = 0;
    character_data.armi.forEach(element => {
        $('#c_armi').append(`
            <div id="weapon_${i}"class="col-md-6">
                <div class="block">
                    <div style="position: absolute;right: 30px;top: 30px; cursor: pointer;"><img id="weapon_del_${i}" src="https://img.icons8.com/material-outlined/24/000000/delete-forever.png"></div>
                    <h3>${element.nome}</h3>
                    <table style="margin-bottom: 20px;">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="desc"><b>B.A.B.</b></th>
                            <th></th>
                            <th class="desc"><b>${element.tiro.stat.toUpperCase()}</b></th>
                        </tr>
                        <tr>
                            <th>Tiro:</th>
                            <th>1d20</th>
                            <th>+</th>
                            <th><input value="${getBAB(character_data.livello)}" type="number" disabled></th>
                            <th>+</th>
                            <th><input class="l_${element.tiro.stat}_mod" type="number" disabled></th>
                            <th style="width: 0px;"></th>
                            <th>Critico:</th>
                            <th>${element.critico}</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="desc"><b>${element.danno.stat == "" ? "//" : element.danno.stat.toUpperCase()}</b></th>
                        </tr>
                        <tr>
                            <th>Danno:</th>
                            <th>${element.danno.dado}</th>
                            <th>+</th>
                            <th><input class="l_${element.danno.stat == "" ? "" : element.danno.stat}_mod" type="number" disabled></th>
                        </tr>
                    </table>
                </div>
            </div>
        `)

        $(`#weapon_del_${i}`).click(function () {
            let index = parseInt(this.id.substr(this.id.lastIndexOf('_') + 1));
            character_data.armi.splice(index, 1);
            loadWeapons();
            statListenerSetup();
        });

        i++;
    });

    $('#c_armi').append(`
        <div id="add_weapon" class="col-md-6">
            <div class="block" style="height: 127px;cursor:pointer;">
                <div style="position: absolute;top: 80px;left: 50%;transform: translate(-50%, -50%);"><h1 style="color: rgb(180, 180, 180);">+ Add Weapon</h1></div>
            </div>
        </div>
    `)

    //Aggiunta Armi

    $('#add_weapon').click(function () {
        $("#weaponModal").css("display", "block");
    });


}

function statListenerSetup() {
    stat_list.forEach(element => {

        $(`#s_${element}_roll`).change(function () {
            $(`.l_${element}_roll`).val(parseInt(this.value) + (race_data.stat_bonus[element] || 0)).trigger("change");

            character_data.stats[element] = parseInt(this.value);

            if (element == "int") {
                $('#ranks_tot').val(getAvailableRanks());
            }
        });

        $(`#s_${element}_tot`).change(function () {
            $(`.l_${element}_tot`).val(getModifier(parseInt(this.value))).trigger("change");
        });

        $(`#s_${element}_mod`).change(function () {
            refreshClasseArmatura();
            $(`.l_${element}_mod`).val(parseInt(this.value)).trigger("change");
        });

        $(`#s_${element}_roll`).val(character_data.stats[element]).trigger("change");

    });
}


function init() {

    //setup iniziale Condizionale

    if (race_data.stat_bonus.choose) {
        $('#stat_choose_msg').html(`*Puoi Aggiungere ${race_data.stat_bonus.choose} punti a scelta nei tuoi roll`);
    }

    //Insert Elementi Html

    $(".input_charForm").toArray().forEach(element => {
        switch (element.name) {
            case "nome":
                element.value = character_data.nome;
                break;
            case "razza":
                element.value = character_data.razza;
                break;
            case "classe":
                element.value = character_data.classe;
                break;
            case "livello":
                element.value = character_data.livello;
                break;

            default:
                break;
        }
    });

    //load dei talenti bonus


    loadTalentiBonus();


    loadInventario();

    //load delle armature

    loadArmor();
    //load delle armi

    loadWeapons();
    //------

    /* let nome = prompt("Nome Arma", "ex: Arco lungo");
            let danno = prompt("Danno", "ex: 1d8");
            let critico = prompt("Critico", "ex: 19/20 x2");
            let tiro_stat = prompt("Stat per colpire: 'des' per armi a distanza , 'for' per armi melee ", "ex: des");
            let danno_stat = prompt("Stat aggiunte ai danni?: lasciare vuoto per armi a distanza, 'for' per armi melee", "ex: for");
            character_data.armi.push({
                "nome": nome,
                "critico": critico,
                "tiro": {
                    "dado": "1d20",
                    "stat": (tiro_stat == "dex" ? "des" : (stat_list.includes(tiro_stat) ? tiro_stat : ""))
                },
                "danno": {
                    "dado": danno,
                    "stat": (danno_stat == "dex" ? "des" : (stat_list.includes(danno_stat) ? danno_stat : ""))
                }
            });
            loadWeapons();
            statListenerSetup(); */

    //configurazione Listener

    $('#character_settings').click(function () {
        $("#charModal").css("display", "block");
    });
    ["charModal", "armorModal", "weaponModal"].forEach(element => {
        $(`#close_${element}`).click(function () {
            $(`#${element}`).css("display", "none");
        });
    });


    $(".form-control").keydown(function (event) {

        if (parseInt(event.which) == 13) {
            if (this.classList.contains("input_charForm")) {
                onCharForm();
            } else if (this.classList.contains("input_weaponForm")) {
                onWeaponForm();
            } else if (this.classList.contains("input_armorForm")) {
                onArmorForm();
            }
        }
    });

    //Rifà il setup dei listener
    statListenerSetup();

    tiri_salvezza_list.forEach(element => {
        $(`#s_${element}_base`).change(function () {
            $(`.l_${element}`).trigger("change");
        });

        $(`#s_${element}_mod`).change(function () {
            $(`.l_${element}`).trigger("change");
        });

        $(`.l_${element}`).change(function () {
            this.value = parseInt($(`#s_${element}_mod`).val()) + parseInt($(`#s_${element}_base`).val());
        });

        $(`#s_${element}_base`).val(getTS(character_data.livello)[element]).trigger("change");

    });

    //Settaggio Parametri---

    ability_list.forEach(element => {
        $(`#s_${element}_tot`).change(function () {
            this.value = character_data.ability_ranks[element] + parseInt($(`#s_${element}_mod`).val()) + parseInt($(`#s_${element}_carat`).val());
        });

        $(`#s_${element}_rank`).val(character_data.ability_ranks[element]).trigger("change");
        $(`#s_${element}_rank`).change(function () {
            character_data.ability_ranks[element] = parseInt(this.value);

            $(`#s_${element}_mod`).trigger("change");

        }).trigger("change");

        $(`#s_${element}_carat`).change(function () {
            $(`#s_${element}_tot`).trigger("change");
        });
        $(`#s_${element}_mod`).change(function () {

            //Aggiorna i Mod Vari (somma abilita di razza, e abilita di classe se ha almeno un rank)
            let value = (race_data.ability_bonus[element] ? race_data.ability_bonus[element] : 0);

            if (parseInt($(`#s_${element}_rank`).val()) > 0) {
                if (class_data.class_abilities.includes(element))
                    value += 3;
            }
            this.value = value;


            $(`#s_${element}_tot`).trigger("change");
        }).trigger("change");
    });

    $('#ranks_tot').val(getAvailableRanks());

    $('.ability_rank').change(function () {
        let val = parseInt(this.value);

        if (this.value < 0) {
            $(`#${this.id}`).val(0).trigger("change");
        }

        if (this.value > character_data.livello) {
            $(`#${this.id}`).val(character_data.livello).trigger("change");
        }

        $('#ranks_tot').val(getAvailableRanks());

        if (getAvailableRanks() < 0)
            $('#ranks_tot').css("color", "red");
        else
            $('#ranks_tot').css("color", "inherit");
    });

    race_data.talenti.forEach(element => {
        $('#talenti_razza').append(`
            <tr>
                <th>${element}</th>
            </tr>
        `);
    });

    class_data.talenti.forEach(element => {
        if (element.livello <= character_data.livello) {
            element.elementi.forEach(talento => {
                $('#talenti_classe').append(`
                    <tr>
                        <th>${talento}</th>
                    </tr>
                `);
            });
        }
    });

    $('#s_bab').val(getBAB(character_data.livello));

    ["oro", "argento", "rame"].forEach(element => {
        $(`#monete_${element}`).val(character_data.monete[element]).change(function () {
            character_data.monete[element] = parseInt(this.value);
        });
    });

    ["nome", "razza", "classe", "livello"].forEach(element => {

        if (["razza", "classe"].includes(element)) {
            $(`#char_${element}`).html(character_data[element].capitalize());
            return;
        }

        $(`#char_${element}`).html(character_data[element]);
    });

    //-------

    toggleBlock('.start_hidden');

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