from pprint import pprint

class Model:
	def __init__(self):
		self.DB = {
			0:{"name":"some_name_0", "data":"some_data_0"},
			1:{"name":"some_name_1", "data":"some_data_1"},
			2:{"name":"some_name_2", "data":"some_data_2"},
			3:{"name":"some_name_3", "data":"some_data_3"},
			4:{"name":"some_name_4", "data":"some_data_4"},
			5:{"name":"some_name_5", "data":"some_data_5"},
			6:{"name":"some_name_6", "data":"some_data_6"},
			7:{"name":"some_name_7", "data":"some_data_7"},
			8:{"name":"some_name_8", "data":"some_data_8"},
			9:{"name":"some_name_9", "data":"some_data_9"},
			10:{"name":"some_name_10","data":"some_data_10"}
		}

	def Get(self, entry_id):
		if entry_id in self.DB.keys():
			return self.DB[entry_id]
		else:
			return "No data found"

	def Update(self, entry_id, field, new_data):
		if entry_id in self.DB.keys():
			if field in self.DB[entry_id].keys():
				self.DB[entry_id][field] = new_data
				return True
			else:
				return "No such field in DB entry"
		else:
			return "No entry with this id: "+ str(entry_id)

	def Delete(self, entry_id):
		if entry_id in self.DB.keys():
			del self.DB[entry_id]
			return True

class View:
	def Show(self, data):
		pprint(data)

	def showForm(self):
		# rowinput()
		pass


class Controller:
	def __init__(self):
		self.model = Model()
		self.view = View()

	def Main(self):
		data = self.model.Get(9)
		self.view.Show(data)

	def Custom_1(self):
		self.model.Update(9,"name","updated_name_kha")
		data = self.model.Get(9)
		self.view.Show(data)

	def Custom_2(self):
		self.model.Delete(9)
		data = self.model.Get(9)
		self.view.Show(data)

# def routing()