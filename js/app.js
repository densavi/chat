document.addEventListener("DOMContentLoaded", () => {

    //modal 
    const isModal = 0;

    if (isModal === 1) {
        var inst = $('[data-remodal-id="modal-access"]').remodal();
        inst.open();
    }
    // end

    // open sidebar
    $('.chat__upgrate-plane').on('click', function (e) {
        e.preventDefault();
        $('.sidebar-left').addClass('active');
        $('body').addClass('hidden');
    })
    $('.sidebar__title svg').on('click', function (e) {
        e.preventDefault();
        $('.sidebar-left').removeClass('active');
        $('body').removeClass('hidden');
    })
    //end

    // Generage Udid
    function generateRandomUDID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }

    var udid = generateRandomUDID();
    // end

    // voice message
    let audio;
    async function voiceMessage(voiceText) {
        try {
            const response = await fetch("voice.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    udid: udid,
                    text: voiceText
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            audio = new Audio(audioUrl);

            if (!$('.chat-sound').hasClass('active')) {
                audio.play();
            } else {
                audio.muted = true;
            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    }
    // end


    // sound on/off
    $('.chat-sound').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            audio.pause();
        }
    })
    //end

    //image to base64
    function getBase64(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result.split(',')[1]);
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    }
    // end

    // chat to bottom
    function chatToBottom() {
        const chatContainer = document.querySelector(".chat__messages");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    chatToBottom();
    //end


    // Send message
    async function sendMessage(udid, text) {
        const response = await fetch("server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                udid: udid,
                text: text
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        $(".message-loader").remove();
        botMessage = data.result.text;
        console.log(data);
        if (data.result && data.result.options) {
            const $chatList = $('.chat-list');
            $.each(data.result.options, function (key, value) {
                $('.chat-list-wrap').addClass('active');
                $chatList.append('<div class="chat-item">' + value + '</div>');
            });
        }
        $(".chat__messages").append(`
      <div class="message message-left">
<div class="message-photo">
                            <img src="images/avatar.webp" alt="">
                        </div>
        ${data.result.text}
      </div>
    `);
        chatToBottom();
        voiceMessage(data.result.text);
        $('.js-message').focus();
    }
    // end

    // Submit form 
    $(".js-form").on("submit", function (e) {
        e.preventDefault();
        var $inputField = $(this).find('input[type="text"]');
        var userMessage = $inputField.val();
        $(".chat__messages").append(`
				<div class="message message-right">
					${userMessage}
				</div>
			`);
        $(".chat__messages").append(`
				<div class="message message-left message-loader">
						<span></span>
						<span></span>
						<span></span>
				</div>
		`);
        $inputField.val("");
        chatToBottom();
        sendMessage(udid, userMessage);
    });
    // End


    // send image 
    const fileInput = document.querySelector('.js-file');
    fileInput.addEventListener('change', function () {

        const file = fileInput.files[0];
        if (file) {
            getBase64(file, function (base64Image) {
                if (!base64Image.startsWith('data:image/')) {
                    base64Image = 'data:image/png;base64,' + base64Image;
                }
                const data = {
                    udid: udid,
                    image: base64Image
                };

                const imageElement = `
      <div class="message message-right message-image">
        <img src="${base64Image}" />
      </div>
    `;
                $('.chat__messages').append(imageElement).append(`
          <div class="message message-left message-loader">
              <span></span>
              <span></span>
              <span></span>
          </div>
      `);

                chatToBottom();

                fetch('server-image.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(response => {
                        $('.message-loader').remove();
                        botMessage = response.result.text;
                        $(".chat__messages").append(`
              <div class="message message-left">
<div class="message-photo">
                            <img src="images/avatar.webp" alt="">
                        </div>
                ${response.result.text}
              </div>
            `);
                        voiceMessage(response.result.text);
                        chatToBottom();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
    });
    // end


    // Send a ready message
    $(".chat-list").on("click", '.chat-item', function () {
        let text = $(this).text();
        $('.chat-list').empty().removeClass('active');
        $(".chat__messages").append(`
			<div class="message message-right">
				${text}
			</div>
		`);
        $(".chat__messages").append(`
			<div class="message message-left message-loader">
					<span></span>
					<span></span>
					<span></span>
			</div>
	`);
        sendMessage(udid, text);
    });
    // end

});
