function showContent(section) {
    // Hide all sections
    document.querySelectorAll('.profile').forEach(function(div) {
        div.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(section).style.display = 'flex';
}