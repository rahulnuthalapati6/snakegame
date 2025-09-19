System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, math, _dec, _class, _crd, ccclass, AppleController;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "597ecmyTctDq4kcpr2gxxND", "applecontroller", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'math']);

      ({
        ccclass
      } = _decorator);

      _export("AppleController", AppleController = (_dec = ccclass('AppleController'), _dec(_class = class AppleController extends Component {
        randomizePosition() {
          const x = math.randomRangeInt(-10, 10) * 32; // snap to grid

          const y = math.randomRangeInt(-10, 10) * 32;
          this.node.setPosition(new Vec3(x, y, 0));
        }

        start() {
          this.randomizePosition();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=583de9b6991117120bfecb45aafbdd5f732b574b.js.map