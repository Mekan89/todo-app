import { Container, Paper, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Todo } from "../components/Todo";
import { useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState, filteredTodoListState, filterState, todoListStatsState } from "../state/state";
import { Box } from "@mui/system";

function Home() {
  const todoList = useRecoilValue(todoListState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const { active, completed, total } = useRecoilValue(todoListStatsState);
  const [currentTab, setCurrentTab] = useRecoilState(filterState);

  const tabs = [
    { value: "All", label: "All", count: total },
    { value: "Completed", label: "Completed", count: completed },
    { value: "Uncompleted", label: "Uncompleted", count: active },
  ];

  console.log(todoList);

  useEffect(() => {
    localStorage.getItem("todos");
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <Container disableGutters={true} maxWidth="sm" sx={{ mt: 7 }}>
      <Paper sx={{ p: 4, minHeight: "55vh" }}>
        <Typography variant="h5" color="primary" align="center" mb={1}>
          Todo App
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Tabs
            onChange={(e, newValue) => setCurrentTab(newValue)}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary">
            {tabs.map(tab => (
              <Tab key={tab.value} label={`${tab.label} ${tab.count}`} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <TodoForm />

        {filteredTodoList.length > 0 && filteredTodoList.map(record => <Todo todo={record} key={record.id} />)}
      </Paper>
    </Container>
  );
}

export default Home;
