export enum SoundType {
    E_Sound_Fly = 0,
    E_Sound_Score,
    E_Sound_Die
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioControl extends cc.Component {


    @property(cc.AudioClip)
    BackGround: cc.AudioClip = null;

    @property(cc.AudioClip)
    FlySound: cc.AudioClip = null;

    @property(cc.AudioClip)
    ScoreSound: cc.AudioClip = null;

    @property(cc.AudioClip)
    DieSound: cc.AudioClip = null;



    // onLoad () {}

    start() {

        cc.audioEngine.playMusic(this.BackGround, true);
    }

    playSound(type: SoundType) {
        if (type == SoundType.E_Sound_Fly) {
            cc.audioEngine.playEffect(this.FlySound, false)
        }
        else if (type == SoundType.E_Sound_Score) {
            cc.audioEngine.playEffect(this.ScoreSound, false)
        }
        else if (type == SoundType.E_Sound_Die) {
            cc.audioEngine.playEffect(this.DieSound, false)
        }
    }
    // update (dt) {}
}
