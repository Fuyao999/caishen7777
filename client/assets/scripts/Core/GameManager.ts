import { _decorator, Component, director } from 'cc';

const { ccclass, property } = _decorator;

// 简化版游戏管理器
@ccclass('GameManager')
export class GameManager extends Component {
    static instance: GameManager = null;
    
    playerData = {
        level: 1,
        stage: 'clay',
        incense_money: 1000,
        yuanbao: 100,
        merit: 0,
        mana: 100,
        incense_sticks: 10,
        candles: 5,
        gold_paper: 3,
        fruits: 2
    };
    
    onLoad() {
        if (GameManager.instance === null) {
            GameManager.instance = this;
            director.addPersistRootNode(this.node);
        }
    }
    
    static getInstance() {
        return GameManager.instance;
    }
}
