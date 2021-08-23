## demo
```
import ThreeScenario from '@/components/ThreeScenario';
class xxx {
    draw(){
        const options = {
            container: this.domNode,
            rendererWidth: Number,
            rendererHeight: Number,
            isDefaultInit: Boolean,
            axesHelper: Boolean,
            auxiliaryStats: Boolean,
            auxiliaryGgrid:{
                show: Boolean, // 是否显示. 默认false
                size : Number, // 坐标格细分次数. 默认为 10.
                divisions : Number, //  坐标格细分次数. 默认为 10
                colorCenterLine : Color, // 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
                colorGrid : Color // 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888
                opacity: Number // 透明度设置，transparent开启后生效，0表示完全透明，1表示完全不透明, 默认1
                transparent: Boolean // 是否开启透明，默认false
            },
            orbitControls:{
                isStart: Boolean, // 是否开启. 默认false
                enableZoom: Boolean, // 是否启用或禁用相机的变焦（移动）. 默认false
                minDistance: Number, // 您可以移动多远. 默认值为0
                maxDistance: Number, // 可以拉远多远. 默认值3000
                enablePan: Boolean, // 是否开启右键拖拽相机平移. 默认false
                autoRotate: Boolean, // 设置为true可自动围绕目标旋转. 默认false
                autoRotateSpeed: Number, // 旋转的速度. 默认2
                enableDamping: Boolean, // 是否动画循环使用时增加阻尼或自转 意思是否有惯性. 默认为true
            },
            sideEffects: {
                initrendererHooks: function(ev){},        // 渲染器
                initsceneHooks: function(ev){},           // 场景
                initcameraHooks: function(ev){},          // 相机
                initlightHooks: function(ev){},           // 场景光
                initAxesHelperHooks: function(ev){},      // 辅助轴线
                initAuxiliaryGgridHooks: function(ev){},  // 辅助网格
                initStatsHooks: function(ev){},           // 辅助性能
                initControlsHooks: function(ev){},        // 用户交互
                animateHooks: function(ev){},             // 更新
                rendersHooks: function(ev){},             // 渲染
                defaultInitHooks: function(ev){},         // 默认初始化
            }
        };
        this.Three = new ThreeScenario(options);
    }
}
```

## 描述

|         成员         |      说明      |     类型     | 是否必填 |            默认值            |
| :------------------: | :------------: | :----------: | :------: | :--------------------------: |
|      container       |  场景容器位置  |  Type:Node   |    否    |        document.body         |
| rendererWidth/Height |    场景宽高    | Type:Number  |    否    | container.offsetWidth/Height |
|    isDefaultInit     | 是否默认初始化 | Type:Boolean |    否    |            false             |
|      axesHelper      |    辅助轴线    | Type:Boolean |    否    |            false             |
|    auxiliaryStats    |    性能插件    | Type:Boolean |    否    |            false             |
|    auxiliaryGgrid    |    辅助网格    | Type:Object  |    否    |             { }              |
|    orbitControls     |    用户交互    | Type:Object  |    否    |             { }              |
|     sideEffects      |     副作用     | Type:Object  |    否    |             { }              |


## 依赖
threejs、lodash、three.interaction