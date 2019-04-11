# AcidLabs Test

## Requerimientos
* Docker
* Docker Compose


## Build

1. Clonar repositorio
```
    $ git clone https://github.com/Nitri0/test-Acid-Labs.git
```

2. Entrar carpeta de proyecto
```
    $ cd test-Acid-Labs
```

3. Agregar dominio acidlab-example.org en **/etc/hosts** apuntando a 127.0.0.1

4. Levantar contendores
```
    $ docker-compouse up
```

5. Ingresa a la web
```
    http://acidlab-example.org/
```


## Porbar aplicacion web sin deploy

Visita:
```
    http://ec2-3-85-56-134.compute-1.amazonaws.com/
```

## Puntos de mejora
* (Backend) Implementar interceptores de axios para reintentar peticiones fallidas.
* (Frontend) Implementar redux
* (Frontend/Mobile) Mejorar ux/ui
* (Mobile) Loading al realizar la consulta.
* (Devops) Agregar certificados ssl

