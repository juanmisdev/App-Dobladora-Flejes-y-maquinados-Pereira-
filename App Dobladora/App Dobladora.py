"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
from dobladora import encontrar_combinacion_medida, encontrar_combinacion_medida_bandeja
import reflex as rx

docs_url = "https://reflex.dev/docs/getting-started/introduction"
filename = f"{config.app_name}/{config.app_name}.py"

options = ['Bandeja', 'Pieza']

class State(rx.State):
    text: str = ""
    medida_pieza: float = 0.0
    show: bool = False
    combinacion: str = ''
    tipo_pieza: str = 'Pieza'

    def clear_text(self):
        self.text = ""
    def set_1(self):
        self.text += "1"
    def set_2(self):
        self.text += "2"
    def set_3(self):
        self.text += "3"
    def set_4(self):
        self.text += "4"
    def set_5(self):
        self.text += "5"
    def set_6(self):
        self.text += "6"
    def set_7(self):
        self.text += "7"
    def set_8(self):
        self.text += "8"
    def set_9(self):
        self.text += "9"
    def set_0(self):
        self.text += "0"
    def set_punto(self):
        self.text += "."
    def set_text(self, text):
        self.text += text
    def close_alert(self):
        self.show = not (self.show)

    def calcular(self):
        if self.tipo_pieza == 'Bandeja':
            self.medida_pieza = float(self.text)
            combinacion = (encontrar_combinacion_medida_bandeja(self.medida_pieza))
            print(combinacion)
            self.text = ""
            self.medida_pieza = 0.0
            self.combinacion = str(combinacion)
            self.close_alert()
        else:
            self.medida_pieza = float(self.text)
            combinacion = (encontrar_combinacion_medida(self.medida_pieza))
            print(combinacion)
            self.text = ""
            self.medida_pieza = 0.0
            self.combinacion = str(combinacion)
            self.close_alert()

def index() -> rx.Component:
    return rx.vstack(
        rx.box(
            rx.radio_group(
                rx.radio_group(
                    rx.hstack(
                        rx.foreach(
                            options,
                            lambda option: rx.radio(option),
                    ),
                        spacing="3em",
                ),
                    default_value='Pieza',
                    on_change=State.set_tipo_pieza,
            ),
            ),
            bg="lightgreen",
            border_radius="20px",
            border_color="green",
            border_width="thick",
            padding=5,
            width="50%",
            height="5%",
        ),
    rx.box(
        rx.grid(

            rx.grid_item(rx.button('1', width='100%', height='100%', on_click=State.set_1())),
            rx.grid_item(rx.button('2', width='100%', height='100%', on_click=State.set_2())),
            rx.grid_item(rx.button('3', width='100%', height='100%', on_click=State.set_3())),
            rx.grid_item(rx.button('4', width='100%', height='100%', on_click=State.set_4())),
            rx.grid_item(rx.button('5', width='100%', height='100%', on_click=State.set_5())),
            rx.grid_item(rx.button('6', width='100%', height='100%', on_click=State.set_6())),
            rx.grid_item(rx.button('7', width='100%', height='100%', on_click=State.set_7())),
            rx.grid_item(rx.button('8', width='100%', height='100%', on_click=State.set_8())),
            rx.grid_item(rx.button('9', width='100%', height='100%', on_click=State.set_9())),
            rx.grid_item(rx.button('0', width='100%', height='100%', on_click=State.set_0())),
            rx.grid_item(rx.button('.', width='100%', height='100%', on_click=State.set_punto())),
            rx.grid_item(rx.button('Borrar', width='100%', height='100%', on_click=State.clear_text())),

            h='50%', width="100%", gap=4, template_columns='repeat(3, 3fr)',
            template_rows='repeat(4, 3fr)', margin_bottom='3em', padding=0,

        ),
        rx.container(
            rx.text('Medida de la pieza (cm):', color_scheme="green", font_size="2em",
                    width="100%", height="100%", margin_y=0), center_content=True, width='70%', height='10%',
        ),
        rx.container(
            rx.input(value=State.text,
                placeholder="Ingrese la medida",
                width="100%", height="100%", font_size="2em",
            ),
            width='70%',height='20%', center_content=True,
        ),
        rx.container(
            rx.button(
                "Calcular", bg="lightblue", color="black", size="md",
                 margin_y=2, width='100%', height='100%', on_click=State.calcular(),
            ), center_content=True, width='70%', height='10%',
        ),
        rx.alert_dialog(
            rx.alert_dialog_overlay(
                rx.alert_dialog_content(
                    rx.alert_dialog_header("Combinacion"),
                    rx.alert_dialog_body(
                        "La combinacion de punzones correcta es: " + State.combinacion
                    ),
                    rx.alert_dialog_footer(
                        rx.button("Ok", on_click=(State.close_alert()))
                    ),
                ),
            ),
            is_open=State.show,
        ),


                bg="lightgreen",
                border_radius="20px",
                border_color="green",
                border_width="thick",
                padding=5,
                width="50%",
                height="50%",
    ),
    center_content=True,
    bg="lightblue",
    justify="center",
    height="100vh",
    width="100vw",
    overflow="hidden",
    padding=0,

)


# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.compile()
