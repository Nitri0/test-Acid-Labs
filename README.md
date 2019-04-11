# AcidLabs Test

## Requerimientos
* Docker
* Docker Compose


## Despliegue

1. Clonar repositorio
```
    $ git clone https://github.com/Nitri0/test-Acid-Labs.git
```

2. Entrar carpeta de proyecto
```
    $ cd test-Acid-Labs
```

3. Agregar dominio **acidlab-example.org** en **/etc/hosts** apuntando a **127.0.0.1**

4. Levantar contendores
```
    $ docker-compouse up
```

5. Ingresa a la url: [**http://acidlab-example.org/**](http://acidlab-example.org/)


## Porbar aplicacion web sin realizar deploy

Visita [**aquí**](http://ec2-3-85-56-134.compute-1.amazonaws.com/)


## Probar mobile app

1. Descarga Expo app [**aquí**](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

    


2. Login con las siguientes credenciales:
**Username:** acidlabstest
**Password:** 123456

3. Ejecuta el proyecto **acidlabs-test**


## Puntos de mejora
* (Backend) Implementar interceptores de axios para reintentar peticiones fallidas.
* (Frontend) Implementar redux
* (Frontend/Mobile) Mejorar ux/ui
* (Mobile) Catch de errores
* (Mobile) Loading al realizar la consulta.
* (Devops) Agregar certificados ssl

