
$(document).ready(function() {
    var path = "";

    var addFile = function(file) {
        var tbody = $("#filebrowser tbody");

        var iconI = $("<i></i>");
        var iconTd = $("<td></td>").attr("class", "icon");
        iconTd.append(iconI);

        var nameSpan = $("<span></span>").text(file.name);
        var descriptionP = $("<p></p>").html(file.description).attr("class", "muted");
        var fileTd = $("<td></td>").attr("class", "name");
        fileTd.append(nameSpan);
        fileTd.append(descriptionP);
        var sizeTd = $("<td></td>").text(file.size).attr("class", "size");
        

        var tr = $("<tr></tr>");
        tr.append(iconTd);
        tr.append(fileTd);
        tr.append(sizeTd);
        
        if(file.directory === true) {
            iconI.attr("class", "icon-folder-close icon-large");
            nameSpan.attr("class", "directory");
            tr.click(function() {
                openDirectory(path + file.name, file.name);
            });
        } else {
            iconI.attr("class", "icon-file-alt icon-large");
            nameSpan.attr("class", "file");
            tr.click(function() {
                openFile(path + file.name);
            });
        }

        tbody.append(tr);
    }

    var openFile = function(file) {
        var iframe = $("#fileloader");
        iframe.attr("src", "open?wpath=" + file);
    }

    var openDirectory = function(directory, name) {
        var tbody = $("#filebrowser tbody");
        tbody.empty();
        tbody.append($("<tr><td></td><td>Carregando...</td></tr>"));

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

    /* http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values */ 
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var wpath = getParameterByName("wpath");
    if(wpath === null) {
        openRoot();
    } else {
        openRoot();
        openDirectory(wpath);
    }
    
});


