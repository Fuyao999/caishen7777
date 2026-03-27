import { _decorator, Component, director, Node, Label, Button } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property(Label)
    label: Label = null;
    
    @property(Button)
    btn: Button = null;
    
    onLoad() {
        console.log('Game loaded!');
        
        if (this.label) {
            this.label.string = '财神大陆 - 点击开始';
        }
        
        if (this.btn) {
            this.btn.node.on('click', this.onClick, this);
        }
    }
    
    onClick() {
        console.log('Clicked!');
        if (this.label) {
            this.label.string = '游戏运行正常！';
        }
    }
}
