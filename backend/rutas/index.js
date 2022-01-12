var sign_in = getelementById('sign_up');

sign_in.addeventListener('shown.bs.modal', function(){
    sign_in.focus();
});