import { _decorator, Component, Node, Vec3, input, Input, EventKeyboard, KeyCode, Prefab, instantiate, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SnakeController')
export class SnakeController extends Component {
    @property(Node) head: Node = null;
    @property([Node]) bodyParts: Node[] = [];
    @property(Prefab) bodyPrefab: Prefab = null;
    @property(Node) apple: Node = null;

    @property({ tooltip: 'Debug: moves every frame' })
    debugMoveEveryFrame: boolean = false;
    @property({ tooltip: 'Speed (pixels/sec) for debug move' })
    debugSpeed: number = 200;

    stepSize: number = 16;
    direction: Vec3 = v3(1, 0, 0);
    nextDirection: Vec3 = v3(1, 0, 0); 
    moveDelay: number = 0.5;
    moveTimer: number = 0;
    positionsQueue: Vec3[] = [];

    start() {
        console.log('SnakeController start — head set?', !!this.head);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) {
        if (!this.head) { console.warn('Head not assigned'); return; }

        if (this.debugMoveEveryFrame) {
            const move = this.direction.clone().multiplyScalar(this.debugSpeed * deltaTime);
            this.head.setPosition(this.head.position.add(move));
            return;
        }

        this.moveTimer += deltaTime;
        while (this.moveTimer >= this.moveDelay) {
            this.moveSnake();
            this.moveTimer -= this.moveDelay;
        }
    }

    moveSnake() {
        if (!this.isOpposite(this.direction, this.nextDirection)) {
            this.direction = this.nextDirection.clone();
        }

        this.positionsQueue.unshift(this.head.position.clone());

        this.head.setPosition(this.head.position.add(this.direction.clone().multiplyScalar(this.stepSize)));

        for (let i = 0; i < this.bodyParts.length; i++) {
            if (i < this.positionsQueue.length && this.bodyParts[i]) {
                this.bodyParts[i].setPosition(this.positionsQueue[i].clone());
            }
        }

        if (this.positionsQueue.length > this.bodyParts.length) {
            this.positionsQueue = this.positionsQueue.slice(0, this.bodyParts.length);
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                if (this.direction.y === 0) this.nextDirection = v3(0, 1, 0);
                break;
            case KeyCode.ARROW_DOWN:
                if (this.direction.y === 0) this.nextDirection = v3(0, -1, 0);
                break;
            case KeyCode.ARROW_LEFT:
                if (this.direction.x === 0) this.nextDirection = v3(-1, 0, 0);
                break;
            case KeyCode.ARROW_RIGHT:
                if (this.direction.x === 0) this.nextDirection = v3(1, 0, 0);
                break;
        }
    }

    growSnake() {
        if (!this.bodyPrefab) return;

        const newBody = instantiate(this.bodyPrefab);
        this.node.addChild(newBody);
        this.bodyParts.push(newBody);

        const startPos = this.positionsQueue.length > 0 ? this.positionsQueue[this.positionsQueue.length - 1] : this.head.position;
        newBody.setPosition(startPos.clone());
    }

    repositionApple() {
        if (!this.apple) return;
        const gridSize = 20;
        const halfGrid = Math.floor(gridSize / 2);
        const x = (Math.floor(Math.random() * gridSize) - halfGrid) * this.stepSize;
        const y = (Math.floor(Math.random() * gridSize) - halfGrid) * this.stepSize;
        this.apple.setPosition(v3(x, y, 0));
    }

    private isOpposite(dir1: Vec3, dir2: Vec3): boolean {
        return dir1.x + dir2.x === 0 && dir1.y + dir2.y === 0;
    }
}
