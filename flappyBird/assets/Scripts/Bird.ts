import { SoundType } from "./AudioControl";
import MainControl, { GameStauts } from "./MainControl";


const { ccclass, property } = cc._decorator;
@ccclass
export default class Bird extends cc.Component {

    mainControl:MainControl=null;
    speed = 0;

    onLoad() {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        
        this.mainControl=cc.Canvas.instance.node.getComponent("MainControl")
    }

    onCollisionEnter(ohter: cc.Collider, self: cc.Collider) {
        
        if(ohter.tag===0){
            
            this.mainControl.gameOver();
            this.speed = 0;
        }
        else if(ohter.tag === 1 ){
            this.mainControl.gameScore++;
            this.mainControl.scoer.string=this.mainControl.gameScore.toString();
            this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Score);
        }
        

    }
    onTouchStart(event: cc.Event.EventTouch) {
        this.speed = 3;
        this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Fly);

    }

    update(dt: number) {

        if(this.mainControl.gameStauts !== GameStauts.Game_Playing){
            return;
        }

        this.speed -= 0.1;
        this.node.y += this.speed;
        // this.node.y = cc.misc.clampf(this.node.y, 240, -235)

        var angle = -(this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.rotation = angle;
        if (this.node.y >= 256 || this.node.y <= -256) {
            this.mainControl.gameOver();
            this.speed = 0;
        }


    }

   
}
