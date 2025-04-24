let sidebarMoved = false;

function moveSidebar()  {
    const sidebar = document.getElementById("sidebarBody");
    sidebar.classList.toggle("active");

    if (!sidebarMoved) {
        sidebar.style.right = "0em";
    }
    else {
        sidebar.style.right = "-20em";
    }

    sidebarMoved = !sidebarMoved;
}
