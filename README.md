# Timeline

Тестовой задание: https://github.com/Life1over/test-task/blob/master/frontend.md  

Точка входа проекта **/public/index.html**  

Шаги для добавления нового события в проект "Запрос перевода":  

1. Добавить класс EventRequestTransfer, реализовать в нем интерфейс IEvent, и методы абстрактного класса EventAbstract.  
2. В EventFactory в метод getEventObject в switch конструкцию добавить тип возвращамеого объекта EventRequestTransfer.
3. В TimelineFormItem в приватное свойство eventTypes добавить событие requestTransfer (используется для выбора события при создании).  
4. Добавить стили, если они будут отличаться от стандартного события.
