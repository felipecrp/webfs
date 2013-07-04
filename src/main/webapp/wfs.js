
$(document).ready(function() {
    var path = "";

    var addFile = function(file) {
        var tbody = $("#filebrowser tbody");

        var iconI = $("<i></i>");
        var iconTd = $("<td></td>").attr("class", "icon");
        iconTd.append(iconI);

        var nameSpan = $("<span></span>").text(file.name);
        var fileTd = $("<td></td>").attr("class", "name");
        fileTd.append(nameSpan);

        var sizeTd = $("<td></td>").text(file.size).attr("class", "size");
        
        var tr = $("<tr></tr>");
        tr.append(iconTd);
        tr.append(fileTd);
        tr.append(sizeTd);
        
        if(file.directory === true) {
            iconI.attr("class", "icon-folder-close icon-large");
            nameSpan.attr("class", "directory");
            tr.click(function() {
                alert(path + file.name);
                openDirectory(path + file.name, file.name);

            });
        } else {
            iconI.attr("class", "icon-file-alt icon-large");
            nameSpan.attr("class", "file");
            tr.click(function() {
                alert("download " + file.name);
            });
        }

        tbody.append(tr);
    }

    var openDirectory = function(directory, name) {
        var tbody = $("#filebrowser tbody");
        tbody.empty();
        tbody.append($("<tr><td></td><td>Carregando...</td></tr>"));

        alert(directory);
        $.ajax({
            type : "GET",
            dataType : "json",
            data: { wpath: directory },
            url : "ls",
            success : function(data) {
                tbody.empty();
                path = directory + "/";
                loadBreadcrumb(directory, name);
                $.each(data, function(index, file) {
                    addFile(file);
                });
            }
        });
    }

    var openRoot = function() {
        openDirectory("", "Root");
    }

    var loadBreadcrumb = function(directory, name) {
        var breadcrumb = $("#path");
        var crumb = $("<li></li>");
        var link = $("<a></a>").text(name);
        var separator = $("<span></span>").text("/").attr("class", "divider");
        crumb.append(link);
        link.after(" ");
        crumb.append(separator);
        breadcrumb.append(crumb);

        link.click(function() {
            crumb.nextAll().remove();
            crumb.remove();
            openDirectory(directory, name);
        });

    }

    openRoot();
    
});


