<?

if (isset($_GET["solrSearch"])) {

        $baseURL = "http://54.201.145.110:8983/solr/tutorial/select?q=" . $_GET["solrSearch"];


        $curl = curl_init($baseURL);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HEADER  , true);  // we want headers


        $result = curl_exec($curl);

        $httpcode =  (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close ($curl);


    if ($httpcode == 200) {
            echo $result;
    } else {
            return "api returned error code: " . $httpcode;
    }
}





?>
