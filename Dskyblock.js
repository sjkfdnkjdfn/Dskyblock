/*本插件原作者为dofes现由GeekGT（TChina）接手*/ 

var x, y, z, query, xuid, form1, item, m_1, it_1, iv_1, it_id, it_sp, itnum2, iisland4, modename;
var conf = data.openConfig('.\\plugins\\GeeK\\configs.json','json','{}');
if (conf.get('normal_x') == null) {
    conf.set('normal_x', 0);
    conf.set('normal_z', 0);
    conf.set('portect_range', 400);
    file.copy('.\\plugins\\GeeK\\structures','.\\behavior_packs\\vanilla\\structures');
    log('[Dskyblock] [info] 检测到是第一次启动,前置文件补全成功!');
    log('[Dskyblock] [info] 感谢@z grass的空岛模板建造!!!');
    log('[Dskyblock] [info] |||||||||||||||||||||||||||||||||||||||||||||\n||||||||||||||||||||||||||||||||||||||||||||')
    
}

var posconf = data.openConfig('.\\plugins\\GeeK\\pos.json','json','{}');//生成过一次空岛就不要修改这个配置文件,不然后面生成的岛屿会出bug!!!!
if (posconf.get('x') == null) {
    posconf.set('x', 0);
    posconf.set('z', 0);
}

mc.regPlayerCmd('is','§r§6Dskyblock-主菜单', ismenu);
mc.regPlayerCmd('is m','§r§6Dskyblock-我的空岛信息', islandcreate1);
setTimeout(function() { api_iland(); }, 5000);
file.createDir('.\\plugins\\GeeK\\data');

function api_iland(){
    createland = lxl.import("ILAPI_CreateLand");
    log('[Dskyblock] [info] iland api 加载成功!');
    log('[Dskyblock] [info] 空岛插件加载成功!');
    log('[Dskyblock] [info] 作者: dofes');
}

function ismenu(pl) {
    pl.sendSimpleForm('空岛菜单', '空岛菜单', ["我的空岛", "空岛商店", "返回空岛"], ["textures/ui/purtle", "textures/ui/promo_gift_small_blue", "textures/ui/backup_replace"], function (pl, selected) {
        if (selected == 0) {
            islandcreate1(pl);
        }
        else if (selected == 1) {
            shop(pl);
        } 
        else if (selected == 2) {
            islandcreate2(pl);
        } 
        else
            return false;
    });
}
function shop(pl){
pl.runcmd('/shop')
}
function islandcreate1(pl) {
    query = file.readFrom('.\\plugins\\GeeK\\data\\'+ pl.xuid +'_island.json');
    if (query != null) 
    {
        querymineisland(pl);
    }
    else
    {
        pl.sendModalForm('空岛菜单', '你还没有岛屿,请选择是否要创建空岛', '是', '否', function (pl, selected) {
            if (selected == true)
            chooseisland(pl);
            else
            ismenu(pl);
        })
    }
}

function islandcreate2(pl) {
    query = file.readFrom('.\\plugins\\GeeK\\data\\'+ pl.xuid +'_island.json');
    if (query != null) 
    {
        land(pl);
    }
    else
        chooseisland(pl);
}

function chooseisland(pl) {
    pl.sendSimpleForm('您还没有空岛', '请选择你想要的岛屿', ["经典岛屿\n§3§o经典的空岛", "双子岛屿\n§3§o两座岛,更多机遇", "困难岛屿\n§c§o为挑战者准备", "极难岛屿\n§o§4选择之后,后果自负"], ["", "", "", ""], function (pl, selected) {
        if (selected == 0) {
            island1(pl);
        }
        else if (selected == 1) {
            island2(pl);
        }
        else if (selected == 2) {
            island3(pl);
        }
        else if (selected == 3) {
            island4(pl);
        }
    });
}

function grid(pl) {
    x = posconf.get("x",0);
    ran = conf.get('portect_range',400);
    if (x < 9600){
        x = posconf.get("x",0) + (ran * 2);
        y = 80;
        z = posconf.get("z",0);
        posconf.set("x",x);
        posconf.set("z",z);
    }
    else if (x >= 9600) {
        z = posconf.get("z",0) + (ran * 2);
        x = 0;
        y = 80;
        posconf.set("x",x);
        posconf.set("z",z);
    }
    createland(pl.xuid,{x:x-(ran+1),y:0,z:z-(ran+1)},{x:x+(ran-1),y:255,z:z+(ran-1)},0);
    file.writeTo('.\\plugins\\GeeK\\data\\'+ pl.xuid +'_island.json', "岛屿创建者 : "+ pl.xuid +"\n类型 : "+modename+"\n坐标:\nx : "+x+"\ny : "+y+"\nz : "+z+"\n", null, 2);
}

function island1(pl, args){
    modename = "经典";
    grid(pl);
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ structure load island1 '+ x +' '+ y +' '+ z +'');
    x = Number(x) + 3;//由于structure的生成机制,所以需要自己偏移玩家坐标
    y = Number(y) + 6;
    z = Number(z) + 4;
    spawnisland套娃(pl);
    return false;
};

function island2(pl, args){
    modename = "双子岛";
    grid(pl);
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ structure load island2 '+ x +' '+ y +' '+ z +'');
    x = Number(x) + 4;
    y = Number(y) + 5;
    z = Number(z) + 3;
    spawnisland套娃(pl);
    return false;
};

function island3(pl, args){
    modename = "§c困难§f";
    grid(pl);
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ structure load island3 '+ x +' '+ y +' '+ z +'');
    y = Number(y) + 3;
    spawnisland套娃(pl);
    return false;
};

function island4(pl) {
    iisland4 = mc.newCustomForm();
    iisland4.setTitle("空岛菜单")
    iisland4.addLabel("极难岛屿还在建设中\n请关注下一次更新(更新是不可能的，这辈子是不可能得！！！！");
    pl.sendForm(iisland4,function(pl) {
        ismenu(pl);
    });
}



function querymineisland(pl) {
    query = file.readFrom('.\\plugins\\GeeK\\data\\'+ pl.xuid +'_island.json');
    form1 = mc.newCustomForm();
    form1.setTitle("空岛菜单")
    form1.addLabel("§e"+pl.realName+"§f\n这是你的空岛信息:\n"+query+"");
    pl.sendForm(form1,function(pl) {
        return 1;
    });
}

function replacewantisland(pl) {
    var form2 = mc.newCustomForm();
    form2.setTitle("空岛菜单")
    form2.addLabel("你已经有空岛了,请勿重复建立");
    pl.sendForm(form2,function(pl) {
        ismenu(pl);
    });
}

mc.listen("onUseItemOn",function(pl,it,bl){
    lava(pl,it,bl);
});


function math_num(pl,it) {
    itnum2 = 0;
    iv_1 = pl.getInventory();
    for (i = 0; i < 37; i++) {
        if (iv_1.getSlot(i).type == it_type & iv_1.getSlot(i).aux == it_sp) {
            var itnum = iv_1.getSlot(i).count;
            itnum2 = itnum2 + itnum;
        }
        if (i == 35) {
            break;
        }
    }
}

mc.listen("onChangeDim",function(pl){
    mc.runcmdEx('effect "'+pl.realName+'" slow_falling 5 255 true');
});
function land(pl){

    pl.runcmd('land tp');
};


function spawnisland套娃(pl) {
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ tp "'+pl.realName+'" '+ x +' '+ y +' '+ z +'');
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ spawnpoint "'+ pl.realName +'" '+ x +' '+ y +' '+ z +'');
    mc.runcmdEx('execute "'+pl.realName+'" ~~~ gamemode 0 "'+pl.realName+'"');
    pl.runcmd('land tp set');

    query = file.readFrom('.\\plugins\\GeeK\\data\\'+ pl.xuid +'_island.json');
    form1 = mc.newCustomForm();
    form1.setTitle("空岛菜单")
    form1.addLabel("§e"+pl.realName+"§f\n这是你的空岛信息:\n"+query+"");
    pl.sendForm(form1,function(pl) {
        return 1;
    });
}