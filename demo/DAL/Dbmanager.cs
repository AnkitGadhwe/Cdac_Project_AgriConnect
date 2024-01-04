using MySql.Data.MySqlClient;
using BOL;
namespace DAL;

public class Dbmanager{

    public static string connStr = "server=localhost;port=3306;user=root;password=W@2915djkq#;database=test";
    public static List<Student> GetAll(){

        List<Student> list1 = new List<Student>();

        MySqlConnection conn = new MySqlConnection();

        conn.ConnectionString = connStr;

        string query = "select * from Student";

        try{
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conn;
            conn.Open();
            cmd.CommandText = query;
            MySqlDataReader reader = cmd.ExecuteReader();

            while(reader.Read()){

                int id = int.Parse(reader["id"].ToString());
                string firstName = reader["namefirst"].ToString();
                string lastName = reader["namelast"].ToString();
                string dob = reader["dob"].ToString();
                string email = reader["email"].ToString();

                Student s = new Student{Id=id,FirstName=firstName,LastName=lastName,Dob=dob,Email=email};

                list1.Add(s);
            }
            }
           catch(Exception ee){
            Console.WriteLine(ee.Message);
           }
           finally{
            conn.Close();
           }
        return list1;
    
    }
}