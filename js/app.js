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

  function timer() {
    const timerElement = document.querySelector(".js-timer span");

    let timer;
    let timeLeft = 180;
    let milliseconds = 0;

    $(".voice-message").addClass("active");
    $(".voice-message-overlay").addClass("active");

    function formatTime(seconds, milliseconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
        2,
        "0"
      )},${String(milliseconds).padStart(2, "0")}`;
    }

    function updateTimer() {
      if (timeLeft <= 0 && milliseconds <= 0) {
        clearInterval(timer);
        timerElement.textContent = "00:00,00";
        mediaRecorder.stop();
        $(".timer-btn").addClass("loading");
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
    timeLeft = 180;
    milliseconds = 0;
    timerElement.textContent = formatTime(timeLeft, milliseconds);
    timer = setInterval(updateTimer, 10);
  }

  let mediaRecorder;
  let audioChunks = [];

  $("#startRecording").click(function () {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        // Настройка анимации волн
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = document.getElementById("waveform");
        const ctx = canvas.getContext("2d");

        function draw() {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / bufferLength) * 1.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(
              x,
              canvas.height - barHeight / 2,
              barWidth,
              barHeight / 2
            );
            x += barWidth + 1;
          }
        }

        draw();

        timer();
        $(".voice-message").addClass("active");
        $(".voice-message-overlay").addClass("active");

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.wav");
          formData.append("udid", udid);

          $.ajax({
            url: "save-audio.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
              if (typeof response === "string") {
                try {
                  response = JSON.parse(response);
                  $(".chat__messages").append(`
                    <div class="message message-right">
                      ${response.result.text}
                    </div>
                  `);
                  sendMessage(udid, response.result.text);
                } catch (e) {
                  console.error("Ошибка парсинга JSON:", e);
                  return;
                }
              }
              $(".timer-btn").addClass("loading");
              $(".voice-message").removeClass("active");
              $(".voice-message-overlay").removeClass("active");
              $(".chat__btn-group").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(
                "Ошибка сохранения аудио: " + textStatus,
                errorThrown
              );
            },
          });
        });
      })
      .catch((error) => {
        console.error("Ошибка доступа к микрофону: " + error.message);
        $(".voice-message").removeClass("active");
        $(".voice-message-overlay").removeClass("active");
      });
  });

  $("#stopRecording").click(function () {
    if (mediaRecorder) {
      mediaRecorder.stop();
      $(".timer-btn").addClass("loading");
      clearInterval(timer);
    }
  });
});
