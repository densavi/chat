<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">

    <title>chat</title>

    <meta name="theme-color" content="#f6f6f6">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="icon" href="images/favicon.png">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal.min.css" integrity="sha512-UO+dUiFTr6cCaPZKCzXEGhYsuK8DkGAS5iThyMUrtHsg+INCFyRM3GiqJ4rjuvfEyn81XGjpfmjSwwR1dAjAsw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal-default-theme.min.css" integrity="sha512-jRxwiuoe3nt8lMSnOzNEuQ7ckDrLl31dwVYFWS6jklXQ6Nzl7b05rrWF9gjSxgOow5nFerdoN6CBB4gY5m5nDw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="css/app.css">

</head>

<body>


    <div class="app">

        <div class="chat">
            <div class="chat__head">

                <div class="chat__plan">
                    <div class="chat__icon">
                        <img src="images/dist/plan.svg" alt="">
                    </div>
                    <div class="chat__info">
                        Aid4Me
                        <span>Active</span>
                    </div>
                </div>


                <a href="#" class="chat__upgrate-plane">
                    <img src="images/info.svg" alt="">
                </a>

                <a href="#modal-tel" class="chat__tel">
                    <svg width="18" height="27" viewBox="0 0 18 27" xmlns="http://www.w3.org/2000/svg">
                        <path d="m17.704 21.785-.875 3.05c-.403 1.408-2.032 2.21-3.373 1.572a23.16 23.16 0 0 1-8.067-5.995 21.607 21.607 0 0 1-4.274-7.701A23.113 23.113 0 0 1 .299 2.7C.586 1.259 2.013.272 3.422.676l3.053.876c.47.134.873.504.973 1.04l.617 5.383a1.376 1.376 0 0 1-.722 1.189l-2.3 1.373a16.925 16.925 0 0 0 4.273 7.7l2.266-1.255c.453-.25.958-.233 1.36.136l4.243 3.375c.553.286.653.822.519 1.292z" fill="#242A46" fill-rule="nonzero" />
                    </svg>
                    Call with the doctor
                </a>

                <button class="chat-sound">
                    <svg class="on" width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4.066c.4.1.6.5.6.9v14c0 .4-.3.7-.6.9-.1.1-.3.1-.4.1-.2 0-.4-.1-.6-.2l-4.7-3.8H1c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1h3.7l4.7-3.8c.3-.2.7-.2 1-.1zm7.516 7.456 1.8 1.79a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0l-1.79-1.8-1.79 1.8a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.8-1.79-1.8-1.79a1.004 1.004 0 0 1 1.42-1.42l1.79 1.8 1.79-1.8a1.004 1.004 0 0 1 1.42 1.42l-1.8 1.79z" fill="#242A46" fill-rule="nonzero" />
                    </svg>
                    <svg class="off" width="21" height="16" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4.066c-.3-.1-.7-.1-1 .1l-4.7 3.8H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h3.7l4.7 3.8c.2.1.4.2.6.2.1 0 .3 0 .4-.1.3-.2.6-.5.6-.9v-14c0-.4-.2-.8-.6-.9zm7.3 2.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4 2.3 2.3 2.3 6.1 0 8.5-.1.1-.3.2-.4.4-.4.4-.5 1-.1 1.4.2.2.5.3.8.4.2 0 .5-.1.6-.2 3.4-2.8 3.8-7.9 1-11.3-.2-.2-.4-.4-.5-.6zm-2.9 2.9c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4.4.3.6.9.6 1.4 0 .6-.3 1.1-.7 1.5-.4.4-.5 1-.1 1.4.4.4 1 .5 1.4.1.9-.7 1.4-1.8 1.4-3 0-1.1-.4-2.1-1.2-2.8z" fill="#242A46" fill-rule="nonzero" />
                    </svg>
                </button>
            </div>
            <div class="chat__content">

                <div class="chat__messages">
                    
                    <!-- <div class="message message-left">
                        Здравствуйте! Что вас беспокоит?
                        <div id="lottie-animation"></div>
                    </div> -->

                </div>

            </div>
            <div class="chat__message">
                <div class="chat-list-wrap">
                    <div class="chat-list">

                    </div>
                </div>

                <form method="post" class="js-form">
                    <input type="text" class="js-message" placeholder="Send a message" required>
                    <div class="chat__form-bottom">
                        <a href="#modal-tel" class="chat__tel-mobile">
                            <svg width="18" height="27" viewBox="0 0 18 27" xmlns="http://www.w3.org/2000/svg">
                                <path d="m17.704 21.785-.875 3.05c-.403 1.408-2.032 2.21-3.373 1.572a23.16 23.16 0 0 1-8.067-5.995 21.607 21.607 0 0 1-4.274-7.701A23.113 23.113 0 0 1 .299 2.7C.586 1.259 2.013.272 3.422.676l3.053.876c.47.134.873.504.973 1.04l.617 5.383a1.376 1.376 0 0 1-.722 1.189l-2.3 1.373a16.925 16.925 0 0 0 4.273 7.7l2.266-1.255c.453-.25.958-.233 1.36.136l4.243 3.375c.553.286.653.822.519 1.292z" fill="#868686" fill-rule="nonzero" />
                            </svg>
                        </a>
                        <label class="label-file" for="file">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <g fill-rule="nonzero" fill="none">
                                    <path d="M8.091.023C6.736-.158 5.428.742 5.227 2.116L4.76 5.29l-2.607.366A2.464 2.464 0 0 0 .056 8.438l.937 6.659a2.464 2.464 0 0 0 2.782 2.097l6.658-.937a2.464 2.464 0 0 0 2.098-2.782l-.157-1.111 1.006.134c1.355.183 2.663-.718 2.865-2.092l.98-6.659c.203-1.382-.807-2.605-2.168-2.788L8.091.023z" fill="#353740" />
                                    <path d="M9.101 8.332a1.174 1.174 0 1 1-2.317.378 1.174 1.174 0 0 1 2.317-.378zm3.046 2.421 1.442.194c.569.076 1.04-.304 1.107-.77l.98-6.658c.067-.455-.264-.932-.827-1.008l-6.966-.936c-.569-.076-1.04.304-1.108.769l-.4 2.719 2.437-.343a2.464 2.464 0 0 1 2.782 2.097l.553 3.937v-.001zm-2.102-3.719a.898.898 0 0 0-1.016-.765l-6.658.936a.898.898 0 0 0-.765 1.016l.485 3.443.836-.832a2.464 2.464 0 0 1 3.22-.221l4.758 3.586a.9.9 0 0 0 .076-.504l-.936-6.659zm-.868 7.82L5.206 11.86a.898.898 0 0 0-1.174.081l-1.669 1.66.18 1.278a.898.898 0 0 0 1.014.765l5.62-.79z" fill="#ECECF1" />
                                </g>
                            </svg>

                            <input class="js-file" type="file" id="file" name="chat-file">
                        </label>
                        <button type="submit">
                            <p style="margin: 0;">Run</p>
                            <span>⌘↵</span>
                            <div class="btn-mobile">
                                <svg width="13" height="15" viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.774 5.466 7.208.9a1 1 0 0 0-1.414 0L1.227 5.466A.999.999 0 1 0 2.64 6.88l2.854-2.853v9.477a1 1 0 1 0 2 0V4.015L10.36 6.88a.999.999 0 1 0 1.414-1.414" fill="#FFF" fill-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>

                </form>

            </div>
        </div>

        <div class="sidebar sidebar-left">
            <div class="sidebar__content">
                <h3 class="sidebar__title">
                    Medical Guidelines
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g fill-rule="nonzero" fill="none">
                            <circle fill-opacity=".04" fill="#000" cx="16" cy="16" r="16" />
                            <path d="m17.4 16 5.3-5.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L16 14.6l-5.3-5.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L17.4 16z" fill="#747682" />
                        </g>
                    </svg>
                </h3>


                <div class="sidebar__settings">
                    <div class="text-labels">
                        <div class="label-with-descr">
                            <div class="label-with-descr__head">
                                <h4 class="label-with-descr__title">American Heart Association Materials</h4>
                            </div>
                            <div class="label-with-descr__text">
                                Materials offered by the American Heart Association that cover various aspects of
                                adapting to
                                cardiovascular
                                diseases. AHA resources are globally recognized for their quality and are backed by
                                scientific research.
                            </div>
                        </div>
                        <div class="label-with-descr">
                            <div class="label-with-descr__head">
                                <h4 class="label-with-descr__title">Guide to Living with a Chronic Condition</h4>
                            </div>
                            <div class="label-with-descr__text">
                                This book, authored by Mayo Clinic specialists, covers a wide range of topics from
                                diagnosis and
                                treatment
                                to emotional and psychological well-being. Mayo Clinic making this guide a highly
                                trusted source of
                                information.
                            </div>
                        </div>


                        <div class="label-with-descr">
                            <div class="label-with-descr__head">
                                <h4 class="label-with-descr__title">National Institute (NICE) Guidelines</h4>
                            </div>
                            <div class="label-with-descr__text">
                                National Institute for Health and Care Excellence offers numerous evidence-based
                                guidelines for various
                                chronic conditions such as diabetes, arthritis, and heart disease.
                            </div>

                            <div class="sidebar__bottom">
                                <a href="#" class="sidebar__btn">
                                    <img src="images/download.svg" alt="">
                                </a>
                            </div>

                        </div>


                        <div class="label-with-descr">
                            <div class="label-with-descr__head">
                                <h4 class="label-with-descr__title">National Institute (NICE) Guidelines</h4>
                            </div>
                            <div class="label-with-descr__text">
                                National Institute for Health and Care Excellence offers numerous evidence-based
                                guidelines for various
                                chronic conditions such as diabetes, arthritis, and heart disease.
                            </div>
                            <div class="sidebar__bottom">
                                <a href="#">https://google.com</a>
                                <a href="#" class="sidebar__btn">
                                    <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M.8 12.8 11.1 2.5H4.5c-.6 0-1-.4-1-1s.4-1 1-1h9c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1s-1-.4-1-1V3.9L2.2 14.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4z" fill="#242A46" fill-rule="nonzero" />
                                    </svg>

                                </a>
                            </div>
                        </div>




                    </div>
                </div>


            </div>
            <div class="sidebar__button">
                <a href="#modal-info">About</a>
                <ul class="sidebar-menu">
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="remodal modal-tel" data-remodal-id="modal-tel">
        <button data-remodal-action="close" class="remodal-close access-close">
            <img src="images/close.svg" alt="">
        </button>
        <div class="modal-body">
            <img class="modal-img access-image" src="images/logo.svg" alt="">

            <h3 class="access-title">
                Video Consultations <br>
                With the Doctor
            </h3>
            <p class="access-text">
                Personalized AI Consultations. <br>
                No limits. No ads.
            </p>
            <div class="access-labels">
                <label for="radio-1">
                    <input type="radio" name="access" id="radio-1" checked>
                    <div class="access-wrap">
                        <span>
                            <svg width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.333 10.214c-.26 0-.433-.093-.606-.278L.26 6.22a.942.942 0 0 1 0-1.3c.347-.371.867-.371 1.213 0l2.86 3.065L11.527.279c.346-.372.866-.372 1.213 0a.942.942 0 0 1 0 1.3l-7.8 8.357c-.173.185-.347.278-.607.278z" fill="#FFF" fill-rule="nonzero" />
                            </svg>
                        </span>
                        <div class="access-content">
                            <h4 class="access-heading">
                                Weekly Subscription
                            </h4>
                            <p class="access-descr">
                                $2 per week / $8 per month
                            </p>
                        </div>
                    </div>
                </label>
                <label for="radio-2">
                    <input type="radio" id="radio-2" name="access">
                    <div class="access-wrap">
                        <span>
                            <svg width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.333 10.214c-.26 0-.433-.093-.606-.278L.26 6.22a.942.942 0 0 1 0-1.3c.347-.371.867-.371 1.213 0l2.86 3.065L11.527.279c.346-.372.866-.372 1.213 0a.942.942 0 0 1 0 1.3l-7.8 8.357c-.173.185-.347.278-.607.278z" fill="#FFF" fill-rule="nonzero" />
                            </svg>
                        </span>
                        <div class="access-content">
                            <h4 class="access-heading">
                                Monthly Subscription
                            </h4>
                            <p class="access-descr">
                                $5 per month
                            </p>
                        </div>
                    </div>
                </label>
            </div>
            <a href="#" class="btn-blue btn-access">Unlock 🔓</a>
        </div>

        <div class="modal-foot">
            <span>© 2024 Aid4Me</span>
            <ul>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
        </div>
        <div class="access-foot-mobile">
            Renews for $2/week <br>
            <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
        </div>

    </div>


    <div class="remodal" data-remodal-id="modal-info">
        <button data-remodal-action="close" class="remodal-close">
            <img src="images/close.svg" alt="">
        </button>
        <div class="modal-body">
            <img class="modal-img" src="images/logo.svg" alt="">

            <h3 class="modal-title">AI Therapist</h3>
            <p class="modal-text">
                Personalized AI Consultations Based on Medical Guidelines for Easier
                Adaptation of Patients with Chronic Conditions
            </p>
            <a href="#" class="btn-blue">START</a>
        </div>

        <div class="modal-foot">
            <span>© 2024 Aid4Me</span>
            <ul>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Support</a></li>
            </ul>
        </div>

    </div>

    <div class="remodal" data-remodal-id="modal-access">
        <button data-remodal-action="close" class="remodal-close access-close">
            <img src="images/close.svg" alt="">
        </button>
        <div class="modal-body">
            <img class="modal-img access-image" src="images/logo.svg" alt="">

            <h3 class="access-title">
                Get full access <br>
                for $1 per week
            </h3>
            <p class="access-text">
                Personalized AI Consultations. <br>
                No limits. No ads.
            </p>
            <div class="access-labels">
                <label for="radio-1">
                    <input type="radio" name="access" id="radio-1" checked>
                    <div class="access-wrap">
                        <span>
                            <svg width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.333 10.214c-.26 0-.433-.093-.606-.278L.26 6.22a.942.942 0 0 1 0-1.3c.347-.371.867-.371 1.213 0l2.86 3.065L11.527.279c.346-.372.866-.372 1.213 0a.942.942 0 0 1 0 1.3l-7.8 8.357c-.173.185-.347.278-.607.278z" fill="#FFF" fill-rule="nonzero" />
                            </svg>
                        </span>
                        <div class="access-content">
                            <h4 class="access-heading">
                                Weekly Subscription
                            </h4>
                            <p class="access-descr">
                                $2 per week / $8 per month
                            </p>
                        </div>
                    </div>
                </label>
                <label for="radio-2">
                    <input type="radio" id="radio-2" name="access">
                    <div class="access-wrap">
                        <span>
                            <svg width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.333 10.214c-.26 0-.433-.093-.606-.278L.26 6.22a.942.942 0 0 1 0-1.3c.347-.371.867-.371 1.213 0l2.86 3.065L11.527.279c.346-.372.866-.372 1.213 0a.942.942 0 0 1 0 1.3l-7.8 8.357c-.173.185-.347.278-.607.278z" fill="#FFF" fill-rule="nonzero" />
                            </svg>
                        </span>
                        <div class="access-content">
                            <h4 class="access-heading">
                                Monthly Subscription
                            </h4>
                            <p class="access-descr">
                                $5 per month
                            </p>
                        </div>
                    </div>
                </label>
            </div>
            <a href="#" class="btn-blue btn-access">Unlock 🔓</a>
        </div>

        <div class="modal-foot">
            <span>© 2024 Aid4Me</span>
            <ul>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Support</a></li>
            </ul>
        </div>
        <div class="access-foot-mobile">
            Renews for $2/week <br>
            <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
        </div>

    </div>


    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/remodal@1.1.1/dist/remodal.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.3/lottie.min.js"></script>

    <script src="js/app.js"></script>

</body>

</html>
