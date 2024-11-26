// Formulario + Validación
"use strict";
window.addEventListener(
    "load",
    function () {
        // Get the messages div.
        var formMessages = $("#form-messages");

        // Manejo de campos de negocio
        const radioSi = document.getElementById("negocio_si");
        const radioNo = document.getElementById("negocio_no");
        const camposNegocio = document.getElementById("campos-negocio");
        const nombreNegocio = document.getElementById("nombre-negocio");
        const giroNegocio = document.getElementById("giro-negocio");

        function toggleCamposNegocio() {
            if (radioSi.checked) {
                camposNegocio.style.display = "block";
                nombreNegocio.required = true;
                giroNegocio.required = true;
            } else {
                camposNegocio.style.display = "none";
                nombreNegocio.required = false;
                giroNegocio.required = false;
                // Limpiar campos cuando se selecciona "No"
                nombreNegocio.value = "";
                giroNegocio.value = "";
            }
        }

        radioSi.addEventListener("change", toggleCamposNegocio);
        radioNo.addEventListener("change", toggleCamposNegocio);

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
                "submit",
                function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add("was-validated");

                    if (form.checkValidity() === true) {
                        event.preventDefault();

                        // To reset the appearance of the form
                        form.classList.remove("was-validated");

                        // Submit the form using AJAX
                        $.ajax({
                            type: $(form).attr("method"),
                            url: $(form).attr("action"),
                            data: new FormData(form),
                            processData: false,
                            contentType: false,
                            beforeSend: function () {
                                $("#hold-on-a-sec").addClass("is-loading");
                            },
                            success: function (response) {
                                $(form).removeClass("was-validated");
                                $(formMessages).removeClass("error");
                                $(formMessages).addClass("success");
                                $(formMessages).text(response);
                                console.log(response);

                                setTimeout(function () {
                                    $(formMessages).remove();

                                    // Clear the form.
                                    $("#nombre").val("");
                                    $("#apellido").val("");
                                    $("#telefono").val("");
                                    $("#correo").val("");
                                    $("#cp").val("");
                                    $("#estado").prop("selectedIndex", 0);
                                    $("#municipio").val("");
                                    $("#pais").prop("selectedIndex", 0);
                                    $("#negocio_si").prop("checked", false);
                                    $("#negocio_no").prop("checked", false);
                                    $("#nombre-negocio").val("");
                                    $("#giro-negocio").prop("selectedIndex", 0);
                                    $("#de-acuerdo").prop("checked", false);
                                    // Ocultar campos de negocio
                                    camposNegocio.style.display = "none";
                                }, 5000);
                            },
                            error: function (response) {
                                $("#hold-on-a-sec").removeClass("is-loading");
                                $(formMessages).removeClass("success");
                                $(formMessages).addClass("error");
                                $(formMessages).text(response);
                                console.log(response);

                                setTimeout(function () {
                                    $(formMessages).remove();

                                    // Clear the form.
                                    $("#nombre").val("");
                                    $("#apellido").val("");
                                    $("#telefono").val("");
                                    $("#correo").val("");
                                    $("#cp").val("");
                                    $("#estado").prop("selectedIndex", 0);
                                    $("#municipio").val("");
                                    $("#pais").prop("selectedIndex", 0);
                                    $("#negocio_si").prop("checked", false);
                                    $("#negocio_no").prop("checked", false);
                                    $("#nombre-negocio").val("");
                                    $("#giro-negocio").prop("selectedIndex", 0);
                                    $("#de-acuerdo").prop("checked", false);
                                    // Ocultar campos de negocio
                                    camposNegocio.style.display = "none";
                                }, 5000);

                                if (response.responseText !== "") {
                                    $(formMessages).text(response.responseText);
                                } else {
                                    $(formMessages).text(
                                        "Lo sentimos, algo salió mal."
                                    );
                                }
                            },
                            complete: function () {
                                $("#hold-on-a-sec").removeClass("is-loading");
                            },
                        });
                    }
                },
                false
            );
        });
    },
    false
);
