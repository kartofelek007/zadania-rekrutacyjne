W rozwiązaniu zastosowałem https://parceljs.org/ poprzez zainstalowanie odpowiedniej paczki z tej strony oraz dodając do pliku package.json skrypt `npm start`, który odpala polecenie `parcel index.html`.

Do wyświetlenia wykresu użyłem darmowej paczki https://www.chartjs.org/
Początkowo wyświetliłem dane dla Polski robiąc połączenie na adres https://documenter.getpostman.com/view/10808728/SzS8rjbc#b07f97ba-24f4-4ebe-ad71-97fa35f3b683

Następnie stworzyłem formularz z filtrami. Zawiera on pola **data-od**, **data-do** oraz kilka wybranych państw. API zawiera endpoint https://documenter.getpostman.com/view/10808728/SzS8rjbc#7934d316-f751-4914-9909-39f1901caeb8 , który zwraca listę wszystkich państw. Niestety nie jest ona za bardzo pomocna, ponieważ część państw (np. Chiny) mają zniekształcone dane, a dodatkowo część państw zwraca puste dane. Wybrałem więc te najbardziej ciekawe.