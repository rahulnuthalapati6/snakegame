import { _decorator, Component, Node, Vec3, math } from 'cc';
const { ccclass } = _decorator;

@ccclass('AppleController')
export class AppleController extends Component {

    public randomizePosition() {
        const x = math.randomRangeInt(-10, 10) * 32; // snap to grid
        const y = math.randomRangeInt(-10, 10) * 32;
        this.node.setPosition(new Vec3(x, y, 0));
    }

    start() {
        this.randomizePosition();
    }
}
