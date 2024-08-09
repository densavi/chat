document.addEventListener("DOMContentLoaded", () => {
  let messageId = 0;

  //modal
  const isModal = 0;

  if (isModal === 1) {
    var inst = $('[data-remodal-id="modal-access"]').remodal();
    inst.open();
  }
  // end

  // open sidebar
  $(".chat__upgrate-plane").on("click", function (e) {
    e.preventDefault();
    $(".sidebar-left").addClass("active");
    $("body").addClass("hidden");
  });
  $(".sidebar__title svg").on("click", function (e) {
    e.preventDefault();
    $(".sidebar-left").removeClass("active");
    $("body").removeClass("hidden");
  });
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          udid: udid,
          text: voiceText,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audio = new Audio(audioUrl);

      if (!$(".chat-sound").hasClass("active")) {
        audio.play();

        console.log(messageId);

        const animation = lottie.loadAnimation({
          container: document.getElementById(`lottie-animation-${messageId}`),
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "js/sound-waves.json",
        });

        setTimeout(function () {
          $(`.lottie-${messageId}`).remove();
        }, 3000);
      } else {
        audio.muted = true;
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }

  // end

  // end

  //image to base64
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result.split(",")[1]);
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        udid: udid,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    $(".message-loader").remove();
    botMessage = data.result.text;
    if (data.result && data.result.options) {
      const $chatList = $(".chat-list");
      $.each(data.result.options, function (key, value) {
        $(".chat-list-wrap").addClass("active");
        $chatList.append('<div class="chat-item">' + value + "</div>");
      });
    }
    messageId++;
    $(".chat__messages").append(`
      <div class="message message-left">
        ${data.result.text}
        <div id="lottie-animation-${messageId}" class="lottie lottie-${messageId}"></div>
      </div>
    `);
    chatToBottom();
    voiceMessage(data.result.text);

    $(".js-message").focus();
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
  const fileInput = document.querySelector(".js-file");
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      getBase64(file, function (base64Image) {
        if (!base64Image.startsWith("data:image/")) {
          base64Image = "data:image/png;base64," + base64Image;
        }
        const data = {
          udid: udid,
          image: base64Image,
        };

        const imageElement = `
      <div class="message message-right message-image">
        <img src="${base64Image}" />
      </div>
    `;
        $(".chat__messages").append(imageElement).append(`
          <div class="message message-left message-loader">
              <span></span>
              <span></span>
              <span></span>
          </div>
      `);

        chatToBottom();

        fetch("server-image.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            $(".message-loader").remove();
            botMessage = response.result.text;
            $(".chat__messages").append(`
              <div class="message message-left">
                ${response.result.text}
              </div>
            `);
            voiceMessage(response.result.text);
            chatToBottom();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  });
  // end

  // Send a ready message
  $(".chat-list").on("click", ".chat-item", function () {
    let text = $(this).text();
    $(".chat-list").empty().removeClass("active");
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

  $(".chat-keyboard").on("click", function (e) {
    e.preventDefault();
    $(".chat__btn-group").hide();
    $(".chat__message").show();
    $(".js-message").focus();
  });

  $(document).on("focusin focusout", ".js-message", function (e) {
    if (e.type === "focusin") {
      $(".chat__btn-group").hide();
    } else if (
      e.type === "focusout" &&
      !$(e.relatedTarget).is(".js-send-message")
    ) {
      $(".chat__message").hide();
      $(".chat__btn-group").show();
    }
  });

  $(".js-send-message").on("click", function () {
    $(".js-message").focus();
  });




  if (!navigator.mediaDevices || !window.MediaRecorder) {
    console.error('MediaRecorder not supported on this browser.');
  }

  let mediaRecorder;
  let audioChunks = [];

  const timerElement = document.querySelector('.js-timer');

  let timer;
  let timeLeft = 180;
  let milliseconds = 0;

  document.getElementById('startRecording').addEventListener('click', () => {
    $('.voice-message').addClass('active');
    $('.voice-message-overlay').addClass('active');


    function formatTime(seconds, milliseconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(milliseconds).padStart(2, '0')}`;
    }

    function updateTimer() {
      if (timeLeft <= 0 && milliseconds <= 0) {
        clearInterval(timer);
        timerElement.textContent = '00:00,00';
        return;
      }

      milliseconds--;
      if (milliseconds < 0) {
        milliseconds = 99;
        timeLeft--;
      }

      timerElement.textContent = formatTime(timeLeft, milliseconds);
    }

      if (timer) {
        clearInterval(timer);
      }
      timeLeft = 180; // сброс таймера на 3 минуты
      milliseconds = 0;
      timerElement.textContent = formatTime(timeLeft, milliseconds);
      timer = setInterval(updateTimer, 10); // обновляем каждые 10 миллисекунд


    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log('Recording finished. Audio URL:', audioUrl);
        };

        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  });

  document.getElementById('stopRecording').addEventListener('click', () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      document.getElementById('startRecording').disabled = false;
      document.getElementById('stopRecording').disabled = true;
    }
  });


});
