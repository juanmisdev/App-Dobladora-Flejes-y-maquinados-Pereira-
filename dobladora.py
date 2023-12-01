from itertools import product, permutations, combinations
from itertools import combinations_with_replacement

p1 = 2
p2 = 2.5
p3 = 3
p4 = 3.5
p5 = 4
p6 = 15
p7 = 30
p8 = 35
p9 = 45
p10 = 80
p11 = 80


pr = 10 #
pl = 10 #


medidas_bandejas = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, pr, pl]
medidas = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11]
suma = 0

def encontrar_combinacion_medida(objetivo, medidas=medidas):
    for r in range(1, len(medidas) + 1):
        for combinacion in combinations(medidas, r):
            if sum(combinacion) == objetivo and combinacion.count(80) <= 2:
                return combinacion

def encontrar_combinacion_medida_bandeja(entrada, medidas=medidas_bandejas):
    objetivo = entrada - 20
    for r in range(1, len(medidas) + 1):
        for combinacion in combinations(medidas, r):
            if sum(combinacion) == objetivo and combinacion.count(80) <= 2:
                combinacion = (10,) + tuple(combinacion) + (10,)
                return combinacion


if __name__ == '__main__':
    bandejas = input('Es una bandeja: S/N: ')
    if bandejas == 'S':
        medida_deseada = float(input('Ingrese la medida: '))
        combinacion = (encontrar_combinacion_medida_bandeja(medida_deseada))
        print(combinacion)
    elif bandejas == 'N':
        medida_deseada = float(input('Ingrese la medida: '))
        combinacion = (encontrar_combinacion_medida(medida_deseada))
        print(combinacion)
    else:
        print('Opcion invalida!!! Ingrese S para si O N para No')
