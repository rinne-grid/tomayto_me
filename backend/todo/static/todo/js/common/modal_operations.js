/***
 * モーダルウィンドウの開閉操作を設定します
 *  - classNameOpenTriggerButton: モーダルウィンドウを開くための要素のクラス名として設定します
 *  - classNameCloseTriggerButton: モーダルウィンドウを閉じるための要素のクラス名として設定します
 *
 *  - data-target: 開閉対象となるモーダルウィンドウのクラス名を指定します
 *  [example]
 *  <button class="rngd_button-modal--open" data-target="rngd_modal--components"></button>
 *  <div class="modal rngd_modal--components"></div>
 */
$(function() {
    const classNameOpenTriggerButton = "rngd_button-modal--open";
    const classNameCloseTriggerButton = "rngd_button-modal--close";

    //---------------------------------------------------------------------------------------------------------------------------------
    // イベントから対象要素のdata-targetを取得します
    //---------------------------------------------------------------------------------------------------------------------------------
    function getDataTarget(elem) {
        return $(elem.target).attr("data-target");
    }

    //---------------------------------------------------------------------------------------------------------------------------------
    // clickNameOpenTriggerButtonクラスのクリックイベント発火時に、dataTargetで指定されたクラス要素にis-activeクラスを追加します
    //---------------------------------------------------------------------------------------------------------------------------------
    $(`.${classNameOpenTriggerButton}`).on("click", (obj) => {
        const dataTarget = getDataTarget(obj);
        $(`.${dataTarget}`).addClass("is-active");
    });

    //---------------------------------------------------------------------------------------------------------------------------------
    // classNameCloseTriggerButtonクラスのクリックイベント発火時に、dataTargetで指定されたからis-activeクラスを削除します
    //---------------------------------------------------------------------------------------------------------------------------------
    $(`.${classNameCloseTriggerButton}`).on("click", (obj) =>{
        const dataTarget = getDataTarget(obj);
        $(`.${dataTarget}`).removeClass("is-active");
    })
});
