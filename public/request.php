<?
//php script for requesting data from the solr back-end.  I don't wanna open up the solr server to requests from anywhere, so I want 
//the react front end to route requests throught the server


if ($_SERVER['REQUEST_METHOD'] === "POST") {
    

    if (!isset($_POST["search"])) {
        header("HTTP/1.0 400 Bad Request");
        die();
    } else {
        $url = "http://18.236.108.24:8983/solr/tutorial/select?q=" . $_POST["search"];
        $curl = curl_init($url);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HEADER, 0);

        $result = curl_exec($curl);

        curl_close ($curl);
        header('HTTP/1.0 200 OK');
        header('Access-Control-Allow-Origin: *');

        header('Access-Control-Allow-Methods: GET, POST');

        header("Access-Control-Allow-Headers: X-Requested-With");
        header('Content-type: application/json');
        echo $result;

    }

} else {
    header("HTTP/1.0 400 Bad Request");
    die();
}


?>