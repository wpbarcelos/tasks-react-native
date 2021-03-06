import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "./../components/Task";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";
import AddTask from "./AddTask";

export default class Agenda extends Component {
  state = {
    tasks: [
      {
        id: Math.random(),
        description: "Comprar o Curso de React Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        description: "Finalizar o curso",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Comprar o Curso de React Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        description: "Finalizar o curso",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Comprar o Curso de React Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        description: "Finalizar o curso",
        estimateAt: new Date(),
        doneAt: null
      }
    ],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false
  };

  addTask = task => {
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: task.desc,
      estimateAt: task.date,
      doneAt: null
    });
    this.setState({ tasks, showAddTask: false }, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({ visibleTasks });
  };

  toggleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    );
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  toggleTask = id => {
    this.setState(
      {
        tasks: this.state.tasks.map(t => {
          if (t.id === id) {
            if (t.doneAt === null) {
              t.doneAt = new Date();
            } else {
              t.doneAt = null;
            }
          }
          return t;
        })
      },
      this.filterTasks
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({ showAddTask: false })}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM [de] YYYY")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          />
        </View>
        <ActionButton
          buttonColor={commonStyles.colors.today}
          onPress={() => {
            this.setState({ showAddTask: true });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  tasksContainer: {
    flex: 7
  },
  iconBar: {
    marginHorizontal: 20,
    marginTop: Platform.OS === "ios" ? 30 : 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
