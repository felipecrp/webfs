
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
                openDirectory(file.name);
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

    var openDirectory = function(directory) {
        var tbody = $("#filebrowser tbody");
        tbody.empty();
        tbody.append($("<tr><td></td><td>Carregando...</td></tr>"));
        path = path + "/" + directory;
        
        var breadcrumb = $("#path");
        var crumb = $("<li></li>");
        var link = $("<a></a>").text(directory);
        var separator = $("<span></span>").text("/").attr("class", "divider");
        crumb.append(link);
        link.after(" ");
        crumb.append(separator);
        breadcrumb.append(crumb);

        link.click(function() {
            path = path;
            openDirectory(path);
        });

        $.ajax({
            type : "GET",
            dataType : "json",
            data: { wpath: path },
            url : "ls",
            success : function(data) {
                tbody.empty();
                $.each(data, function(index, file) {
                    addFile(file);
                });
            }
        });
    }

    openDirectory("/");
    
});


