import AudioControl, { SoundType } from "./AudioControl";

export enum GameStauts {
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainControl extends cc.Component {


    @property(cc.Prefab)
    pipePerfeb: cc.Prefab = null;

    pipe: cc.Node[] = [null, null, null];

    GameOver: cc.Sprite = null;

    playbtn: cc.Button = null;

    gameStauts: GameStauts = GameStauts.Game_Ready;

    @property(cc.Label)
    scoer:cc.Label= null 

    gameScore:number = 0;

    @property(cc.Sprite)
    spBg: cc.Sprite[] = [null, null];
    bgSize = 288;
    bgSpeed = 1.0;

    @property(AudioControl)
    audioSourceControl:AudioControl=null;
    

    gameOver() {
        this.GameOver.node.active = true;
        this.playbtn.node.active = true;
        this.gameStauts = GameStauts.Game_Over;
        this.audioSourceControl.playSound(SoundType.E_Sound_Die);
        this.schedule(this.Menu,0.4)
    }
    Menu(){
    cc.director.loadScene('main');
    }
    onLoad() {
        var Manager = cc.director.getCollisionManager();
        Manager.enabled = true
        // Manager.enabledDebugDraw = true;
        this.GameOver = this.node.getChildByName('GameOver').getComponent(cc.Sprite)
        this.GameOver.node.active = false;

        this.playbtn = this.node.getChildByName("PlayBnt").getComponent(cc.Button);
        this.playbtn.node.on(cc.Node.EventType.TOUCH_END, this.touchPlayBtn, this)

        // console.log("On Load");
        // this.spBg.push(this.node.children[1]);
        // this.spBg.push(this.node.children[2]);
    }

    touchPlayBtn() {

        this.playbtn.node.active = false;
        this.gameStauts = GameStauts.Game_Playing;

        this.GameOver.node.active = false;

        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = cc.instantiate(this.pipePerfeb);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);

            this.pipe[i].x = 170 + 200 * i;
            var minY = -140;
            var maxY = 140;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }

        var bird = this.node.getChildByName("Bird")
        bird.y = 0
        bird.rotation = 0;

        this.gameScore = 0;
        this.scoer.string = this.gameScore.toString();
    }


    start() {

    }

    update(dt) {

        if (this.gameStauts !== GameStauts.Game_Playing) {
            return;
        }

        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= 1.0;
            if (this.pipe[i].x <= -170) {
                this.pipe[i].x = 430;

                var minY = -140;
                var maxY = 140;
                this.pipe[i].y = minY + Math.random() * (maxY - minY);
            }
        }
        for (let i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.x -= this.bgSpeed;
            if (this.spBg[i].node.x <= -this.bgSize) {
                this.spBg[i].node.x = this.bgSize;
            }
        }


    }

}
