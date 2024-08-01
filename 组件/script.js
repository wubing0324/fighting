let prev = ''
function openTab(evt, tabName) {
    // 获取所有元素
    var i, tabcontent, tablinks;

    // 获取所有带有 class="tabcontent" 的元素并隐藏它们
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // 获取所有带有 class="tablinks" 的元素并移除 class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].className = tablinks[i].className.replace(" notActive", "");
    }

    // 显示当前的tab，并添加 "active" 类到按钮
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";

    if (prev) {
        document.getElementById(prev).classList.add("notActive");
    }
    // notActive
    prev = tabName
}
