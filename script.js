const form = document.getElementById('form');
const name = document.getElementById('name');
const emailuser = document.getElementById('email');
const phoneuser = document.getElementById('phone');
const errorphone = document.querySelector('.errorN');


phoneuser.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 11);
});


form.addEventListener('submit', function(e) {
    e.preventDefault();
    let validpa = true;

    
    if (name.value.trim() === '') {
        name.parentElement.classList.add('error');
        validpa = false;
    } else {
        name.parentElement.classList.remove('error');
    }

    
    const email = emailuser.value.trim();

    if (email === '' || !email.includes('@') || !email.includes('.')) {
        emailuser.parentElement.classList.add('error');
        validpa = false;
    } else {
        emailuser.parentElement.classList.remove('error');
    }

    
    const phone = phoneuser.value.trim();
    if (phone === '') {
        errorphone.textContent = 'Пожалуйста, введите номер';
        phoneuser.parentElement.classList.add('error');
        validpa = false;
    } else if (phone.length !== 11) {
        errorphone.textContent = 'Пожалуйста, введите все 11 цифр номера';
        phoneuser.parentElement.classList.add('error');
        validpa = false;
    } else {
        phoneuser.parentElement.classList.remove('error');
    }

    
    if (validpa) {
        const formData = new FormData(form);
        
        fetch("https://script.google.com/macros/s/AKfycbx1uCXKrrqu6dnX9akhonej8L68LNSp1DQvgpWwr8f2AmlhZyHCfz0Kw3XG9TobciY/exec", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then(data => {
            alert('Данные успешно отправлены!');
            form.reset();
        })
        .catch(error => {
            alert('Ошибка при отправке данных');
            console.error(error);
        });
    }
});


document.querySelectorAll('.item').forEach(input => {
    input.addEventListener('input', function() {
        this.parentElement.classList.remove('error');
        
    });
});