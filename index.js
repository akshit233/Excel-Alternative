const $ = require('jquery');
const electron = require('electron').remote;
const dialog = electron.dialog;
const fsp = require('fs').promises;
$(document).ready(function () {
    
    let rows = [];
    // let lso = [];
    function getDefaultCell() {
        let obj;
        return obj =  {
            val: '',
            fontFamily: 'Georgia',
            fontSize: '10',
            bold: false,
            italic: false,
            underline: false,
            bgColor: '#FFFFFF',
            textColor: '#000000',
            valign: 'middle',
            halign: 'left',
            formula: '',
            upstream: [],
            downstream: []
        }
    }

    function prepareCellDiv(cdiv, cobj) {
        $(cdiv).html(cobj.val);
        $(cdiv).css('font-family', cobj.fontFamily);
        $(cdiv).css('font-size', cobj.fontSize + 'px');
        $(cdiv).css('font-weight', cobj.bold ? 'bold' : 'normal');
        $(cdiv).css('font-style', cobj.italic ? 'italic' : 'normal');
        $(cdiv).css('text-decoration', cobj.underline ? 'underline' : 'none');
        $(cdiv).css('background-color', cobj.bgColor);
        $(cdiv).css('color', cobj.textColor);
        $(cdiv).css('text-align', cobj.halign);
        // halign: 'left';
    }

    $('#content-container').on('scroll', function () {

        
        $("#first-row").css('top', $("#content-container").scrollTop());
        $("#first-col").css('left', $("#content-container").scrollLeft());
        $("#tl-cell").css('left', $("#content-container").scrollLeft());
        $("#tl-cell").css('top', $("#content-container").scrollTop());
    });

    $("#new").on('click', function () {
        rows = [];

        $("#grid").find('.row').each(function () {
            let cells = [];
        //    console.log("br 1");
            $(this).find('.cell').each(function () {
                let cell = getDefaultCell();
                cells.push(cell);
                prepareCellDiv(this, cell);
            })
            rows.push(cells);
        })

        $('#grid .cell:first').click();
        // console.log("br 2");
        $('#home-menu').click();
        console.log("done");
    })
    


    $("#open").on('click', async function () {
        let dobj = await dialog.showOpenDialog();
        let data = await fsp.readFile(dobj.filePaths[0]);
        rows = JSON.parse(data);

        let i = 0;
        $('#grid').find('.row').each(function () {
            let j = 0;
            $(this).find('.cell').each(function () {
                let cell = rows[i][j];
                prepareCellDiv(this, cell);
                j++;
            })
            i++;
        })
        $('#grid .cell:first').click();
        $('#home-menu').click();

    });

    $('#save').on('click', async function () {

        let dobj = await dialog.showSaveDialog();
        await fsp.writeFile(dobj.filePath, JSON.stringify(rows));
        alert('Saved Successfully');
        $('#home-menu').click();
    })


    $('#menu-bar > div').on('click', function () {
        $('#menu-bar > div').removeClass('selected');

        $(this).addClass('selected');

        let menuContainerId = $(this).attr('data-content');
        if(menuContainerId === undefined) 
        return;
        console.log(this);
        $("#menu-content-container > div").css('display', 'none');
        console.log("br1");
        $('#' + menuContainerId).css('display', 'flex');
        console.log("br2");
    });


    $('#font-family').on('change', function () {
        let fontFamily = $(this).val();
        $('#grid .cell.selected').each(function () {
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('rid'));
            let cobj = rows[rid][cid];
            cobj.fontFamily = fontFamily;

        })

    })

    $('#font-size').on('change', function () {
        let fontSize = $(this).val();
        $('#grid .cell.selected').each(function () {
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('rid'));
            let cobj = rows[rid][cid];
            cobj.fontSize = fontSize;

        })

    })

    $('#bold').on('click', function () {
        $(this).toggleClass('selected');
        let bold = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('font-weight', bold ? 'bold' : 'normal');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('rid'));
            let cobj = rows[rid][cid];
            cobj.bold = bold;

        })
    })

    $('#italic').on('click', function () {
        $(this).toggleClass('selected');
        let italic = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('font-style', italic ? 'italic' : 'normal');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('rid'));
            let cobj = rows[rid][cid];
            cobj.italic = italic;

        })
    })


    $('#underline').on('click', function () {
        $(this).toggleClass('selected');
        let underline = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('text-decoration', underline ? 'underline' : 'none');
            let rid = parseInt($(this).attr('rid', 10));
            let cid = parseInt($(this).attr('rid', 10));
            let cobj = rows[rid][cid];
            cobj.underline = underline;

        })
    })


    $('#bg-color').on('change', function () {
        let bgColor = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('background-color', bgColor);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('rid'));
            let cobj = rows[rid][cid];
            cobj.bgColor = bgColor;

        })
    })


    $('#text-color').on('change', function () {
        let textColor = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('color', textColor);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.textColor = textColor;

        })
    })


    $('.valign').on('click', function () {
        $('.valign').removeClass('selected');
        $(this).addClass('selected');
    })


    $('.halign').on('click', function () {
        $('.halign').removeClass('selected');
        $(this).addClass('selected');
        let halign = $(this).attr('prop-val');
        $('#grid .cell.selected').each(function () {
            $(cdiv).css('text-align', halign);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            covj.halign = halign;
        })

    })


    $('#grid .cell').on('click', function (e) {
        if (e.ctrlkey) {
            $(this).addClass('selected');
        }
        else {
            $('#grid .cell').removeClass('selected');
            $(this).addClass('selected');
        }
        let rid = parseInt($(this).attr('rid'));
        // console.log(rid);
        let cid = parseInt($(this).attr('cid'));
        // console.log(cid);
        let cobj = rows[rid][cid];
        // console.log(cobj + " + " + rows);
        // cobj.val=$(this).html();
        $('#font-family').val(cobj.fontFamily);
        $('#font-size').val(cobj.fontSize);

        if (cobj.bold) {
            $('#bold').addClass('selected');
        }
        else {
            $('#bold').removeClass('selected');
        }

        if (cobj.italic) {
            $('#italic').addClass('selected');
        }
        else {
            $('#italic').removeClass('selected');
        }
        if (cobj.underline) {
            $('#underline').addClass('selected');
        }
        else {
            $('#underline').removeClass('selected');
        }

        $('#bg-color').val(cobj.bgColor);
        $('#text-color').val(cobj.textColor);
        $('.halign').removeClass('selected');
        $('.halign[prop-val=' + cobj.halign + ']').addClass('selected');
        $('#cellFormula').val(String.fromCharCode(cid + 65) + (rid + 1));
        $('#txtFormula').val(cobj.formula);
    })

    function deleteFormula(rid, cid) {
        let cobj = rows[rid][cid];
        cobj.formula = '';

        for (let i = 0; i < cobj.upstream.length; i++) {
            let uso = cobj.upstream[i];
            let fuso = rows[uso.rid][uso.cid];

            for (let j = 0; j < fuso.downstream.length; j++) {
                let dso = fuso.downstream[j];
                if (dso.rid == rid && dso.cid == cid) {
                    fuso.downstream.splice(j, 1);
                    break;
                }
            }
        }
        cobj.upstream = [];
    }

    function setUpFormula(rid, cid, formula) {
        let cobj = rows[rid][cid];
        cobj.formula = formula;
        formula.replace('(', '').replace(')', '');
        let comps = formula.split(' ');
        for (let i = 0; i < comps.length; i++) {
            if (comps[i].charCodeAt(0) >= "A".charCodeAt(0) && comps[i].charCodeAt(0) <= "Z".charCodeAt(0)) {
                let urid = parseInt(comps[i].substr(1)) - 1;
                let ucid = comps[i].charCodeAt(0) - "A".charCodeAt(0);
                cobj.upstream.push({
                    rid: urid,
                    cid: ucid
                })

                let fuso = rows[urid][ucid];
                fuso.downstream.push({
                    rid: rid,
                    cid: cid
                })
            }
        }

    }

    function evaluateFormula(cobj) {
        let formula = cobj.formula;
        for (let i = 0; i < cobj.upstream.length; i++) {
            let uso = cobj.upstream[i];
            let fuso = rows[uso.rid][uso.cid];
            let cellName = String.fromCharCode("A".charCodeAt(0) + uso.cid) + (uso.rid + 1);
            formula = formula.replace(cellName, fuso.val || 0);
        }

        let nval = eval(formula);
        return nval;

    }

    function updateVal(rid, cid, val, render) {

        let cobj = rows[rid][cid];
        cobj.val = val;
        if (render) {
            $('.cell[rid=' + rid + '][cid=' + cid + ']').html(val);
        }
        for (let i = 0; i < cobj.downstream.length; i++) {
            let dso = cobj.downstream[i];
            let fdso = rows[dso.rid][dso.cid];
            let nval = evaluateFormula(fdso);
            updateVal(dso.rid, dso.cid, nval, true);

        }

    }


    $('#grid .cell').on('keyup', function (e) {
        let rid = parseInt($(this).attr('rid'));
        let cid = parseInt($(this).attr('cid'));
        let cobj = rows[rid][cid];
        cobj.val = $(this).html();
        if (cobj.formula) {
            $('#txtFormula').val('');
            deleteFormula(rid, cid);
        }
        updateVal(rid, cid, $(this).html(), false);
    })

    $('#txtFormula').on('blur', function () {
        let formula = $(this).val();

        $('#grid .cell.selected').each(function() {
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];

            if(cobj.formula) {
                deleteFormula(rid, cid);
            }

            setUpFormula(rid, cid, formula)
            let nval = evaluateFormula(cobj);
            updateVal(rid, cid, nval, true);
        })

    })

    $('#new').click();
});
