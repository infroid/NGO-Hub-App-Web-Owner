$(function() {
  	var fileInput = $('.cd-file-field');
  	var imgList = $('ul.cd-img-list');
  	var dropBox = $('.cd-dropzone');
  	var footerBox = $('.cd-footer');
    var imgBox = $('.cd-img-container');
  	
  	var clearButton = $('.cd-clear-bnt');
  	
  
		var fileList = [];
  
   
    fileInput.bind({
      change: function() {
        displayFiles(this.files);
      }
    });
  
  	
  	imgBox.bind({
      dragover: function(e) {
        e.stopPropagation();
    		e.preventDefault();
        return false;
      },
      drop: function(e) {
        e.stopPropagation();
    		e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        displayFiles(dt.files);
        return false;
      }
    });
  
    // drag and drop dropBox
    dropBox.bind({
      dragenter: function() {
        dropBox.addClass('cd-dropzone-highlighted');
        return false;
      },
      dragover: function(e) {
        e.stopPropagation();
    		e.preventDefault();
        return false;
      },
      dragleave: function() {
        dropBox.removeClass('cd-dropzone-highlighted');
        return false;
      },
      drop: function(e) {
        dropBox.removeClass('cd-dropzone-highlighted');
        e.stopPropagation();
    		e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        displayFiles(dt.files);
        return false;
      }
    });
  
  	clearButton.bind({
      click: function(e){
        e.stopPropagation();
        $('.cd-img-list > li').remove();       
        fileList = [];
        displayFiles(fileList);
      }
    });
  
  
   
  	function displayFiles(files) {     
      
      $.each(files, function(i, file) {      
          //Check for file type
        	if (!file.type.match(/image.*/)) {
            return true;
          }           
        
        	//Check for file size
        	//TODO
        
        	fileList[fileList.length] = file;

          var li = $('<li/>').appendTo(imgList);     
          var img = $('<img/>').appendTo(li);
          $('<div/>').text(file.name).appendTo(li);
	        $('<progress/>').appendTo(li);
        
        	

        	var reader = new FileReader();
          reader.onload = (function(aImg) {
            return function(e) {
              aImg.attr('src', e.target.result);
              aImg.attr('max-width', 100);
              aImg.attr('height', 150);
            };
          })(img);

          reader.readAsDataURL(file);
        });
      
      	var filesSize = 0;
      	var fileCount = 0;
      	//Count total file size
      	$.each(fileList, function(i, file) {   
        	filesSize  = filesSize + file.size;
          fileCount  = fileCount + 1;
        });
        if(filesSize === 0){
        	footerBox.text('No files selected');  
        }else{
	      	footerBox.text('Selected '+fileCount+' files, total size is ' + (filesSize/(1024*1024)).toFixed(2) + ' MB');
        }
    }
  
    $(".cd-buttons").mousedown(function() {
        var button = $(this);
        button.addClass('clicked');
        setTimeout(function(){
            button.removeClass('clicked');
        },50);
    });
 
  
});